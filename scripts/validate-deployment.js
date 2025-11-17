#!/usr/bin/env node

/**
 * Deployment Validation Script for SapientPriors Website
 *
 * This script validates that all necessary configurations are in place
 * for deploying the website and email functionality.
 */

const https = require('https');
const dns = require('dns').promises;
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function section(title) {
  console.log();
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan');
  log(`  ${title}`, 'cyan');
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan');
}

function check(message, status) {
  const symbol = status ? '✓' : '✗';
  const color = status ? 'green' : 'red';
  log(`  ${symbol} ${message}`, color);
}

function guidance(message) {
  log(`    → ${message}`, 'yellow');
}

// Validation checks
const checks = {
  async checkEnvFile() {
    section('1. Environment Configuration');

    const fs = require('fs');
    const path = require('path');

    // Check for .env file
    const envPath = path.join(process.cwd(), '.env');
    const hasEnv = fs.existsSync(envPath);

    check('.env file exists', hasEnv);
    if (!hasEnv) {
      guidance('Create a .env file in the project root');
      guidance('Copy .env.example: cp .env.example .env');
      guidance('Add your Resend API key to the .env file');
      return false;
    }

    // Check for RESEND_API_KEY
    require('dotenv').config();
    const hasResendKey = !!process.env.RESEND_API_KEY;

    check('RESEND_API_KEY is set', hasResendKey);
    if (!hasResendKey) {
      guidance('Get API key from: https://resend.com/api-keys');
      guidance('Add to .env: RESEND_API_KEY=re_xxxxx');
      return false;
    }

    // Validate API key format
    const validFormat = process.env.RESEND_API_KEY.startsWith('re_');
    check('RESEND_API_KEY format is valid', validFormat);
    if (!validFormat) {
      guidance('API key should start with "re_"');
      guidance('Double-check your key from Resend dashboard');
      return false;
    }

    return true;
  },

  async checkResendAPI() {
    section('2. Resend API Connectivity');

    if (!process.env.RESEND_API_KEY) {
      check('Resend API configured', false);
      guidance('Set up Resend API key first (see section 1)');
      return false;
    }

    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Try to fetch domains to verify API key
      const domains = await resend.domains.list();

      check('Resend API connection successful', true);

      if (domains.data && domains.data.length > 0) {
        check(`Found ${domains.data.length} domain(s)`, true);

        // Check for verified domains
        const verified = domains.data.filter(d => d.status === 'verified');
        if (verified.length > 0) {
          check(`${verified.length} domain(s) verified`, true);
          verified.forEach(d => {
            log(`    ✓ ${d.name} (verified)`, 'green');
          });
        } else {
          check('No verified domains found', false);
          guidance('Verify your domain at: https://resend.com/domains');
          guidance('Add DNS records (SPF, DKIM) to your domain registrar');
          guidance('Without verification, emails only send to verified addresses');
        }
      } else {
        check('No domains configured', false);
        guidance('Add your domain at: https://resend.com/domains');
        guidance('Recommended: sapientpriors.com');
      }

      return true;
    } catch (error) {
      check('Resend API connection failed', false);
      if (error.message.includes('Invalid')) {
        guidance('API key appears to be invalid');
        guidance('Get a new key from: https://resend.com/api-keys');
      } else {
        guidance(`Error: ${error.message}`);
      }
      return false;
    }
  },

  async checkDependencies() {
    section('3. Dependencies');

    const fs = require('fs');
    const path = require('path');

    // Check package.json
    const packagePath = path.join(process.cwd(), 'package.json');
    const hasPackage = fs.existsSync(packagePath);
    check('package.json exists', hasPackage);

    if (!hasPackage) {
      guidance('Run: npm init');
      return false;
    }

    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    // Check required dependencies
    const required = ['resend', 'express', 'dotenv'];
    let allPresent = true;

    for (const dep of required) {
      const present = (pkg.dependencies && pkg.dependencies[dep]) ||
                     (pkg.devDependencies && pkg.devDependencies[dep]);
      check(`${dep} installed`, present);
      if (!present) {
        guidance(`Run: npm install ${dep}`);
        allPresent = false;
      }
    }

    // Check node_modules
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    const hasNodeModules = fs.existsSync(nodeModulesPath);
    check('node_modules exists', hasNodeModules);
    if (!hasNodeModules) {
      guidance('Run: npm install');
      allPresent = false;
    }

    return allPresent;
  },

  async checkVercelConfig() {
    section('4. Vercel Deployment Configuration');

    const fs = require('fs');
    const path = require('path');

    // Check vercel.json
    const vercelPath = path.join(process.cwd(), 'vercel.json');
    const hasVercel = fs.existsSync(vercelPath);
    check('vercel.json exists', hasVercel);

    if (!hasVercel) {
      guidance('Create vercel.json for deployment configuration');
      return false;
    }

    const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

    // Check builds configuration
    const hasBuilds = config.builds && config.builds.length > 0;
    check('Builds configured', hasBuilds);

    // Check routes configuration
    const hasRoutes = config.routes && config.routes.length > 0;
    check('Routes configured', hasRoutes);

    // Check for API route
    if (hasRoutes) {
      const hasApiRoute = config.routes.some(r => r.src && r.src.includes('/api/'));
      check('API routes configured', hasApiRoute);
      if (!hasApiRoute) {
        guidance('Add API route configuration to vercel.json');
      }
    }

    return hasVercel && hasBuilds && hasRoutes;
  },

  async checkVercelCLI() {
    section('5. Vercel CLI (Optional)');

    try {
      await execAsync('vercel --version');
      check('Vercel CLI installed', true);

      try {
        const { stdout } = await execAsync('vercel whoami');
        check(`Logged in as: ${stdout.trim()}`, true);
      } catch {
        check('Not logged in to Vercel', false);
        guidance('Run: vercel login');
      }

      return true;
    } catch {
      check('Vercel CLI not installed (optional)', false);
      guidance('Install: npm i -g vercel');
      guidance('Or deploy via Vercel dashboard: https://vercel.com/new');
      return true; // Not critical
    }
  },

  async checkContactEndpoint() {
    section('6. Contact API Endpoint');

    const fs = require('fs');
    const path = require('path');

    const routesPath = path.join(process.cwd(), 'server', 'routes.ts');
    const hasRoutes = fs.existsSync(routesPath);

    check('server/routes.ts exists', hasRoutes);

    if (hasRoutes) {
      const content = fs.readFileSync(routesPath, 'utf8');
      const hasContactEndpoint = content.includes('/api/contact');
      check('/api/contact endpoint defined', hasContactEndpoint);

      if (!hasContactEndpoint) {
        guidance('Add /api/contact endpoint to server/routes.ts');
        return false;
      }

      const usesResend = content.includes('resend');
      check('Endpoint uses Resend', usesResend);
    }

    return hasRoutes;
  },

  async testEmailSending() {
    section('7. Test Email Functionality');

    if (!process.env.RESEND_API_KEY) {
      check('Cannot test - API key not configured', false);
      return false;
    }

    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      log('  Testing email sending capability...', 'yellow');
      guidance('Attempting to send test email');

      const result = await resend.emails.send({
        from: 'SapientPriors <noreply@sapientpriors.com>',
        to: 'raveeshupahuja@sapientpriors.com',
        subject: 'Deployment Validation Test',
        html: `
          <h2>Deployment Validation</h2>
          <p>This is a test email from your deployment validation script.</p>
          <p>If you received this, your email configuration is working correctly!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent at: ${new Date().toISOString()}</p>
        `
      });

      check('Test email sent successfully', true);
      log(`    Email ID: ${result.data?.id || 'N/A'}`, 'green');
      guidance('Check raveeshupahuja@sapientpriors.com for test email');

      return true;
    } catch (error) {
      check('Test email failed', false);
      guidance(`Error: ${error.message}`);

      if (error.message.includes('not verified')) {
        guidance('Domain not verified - verify at: https://resend.com/domains');
      } else if (error.message.includes('unauthorized')) {
        guidance('Check your Resend API key');
      }

      return false;
    }
  }
};

async function main() {
  console.clear();
  log('═══════════════════════════════════════════════════════', 'blue');
  log('  SapientPriors Website - Deployment Validation', 'blue');
  log('═══════════════════════════════════════════════════════', 'blue');

  const results = {
    env: await checks.checkEnvFile(),
    dependencies: await checks.checkDependencies(),
    resend: await checks.checkResendAPI(),
    vercel: await checks.checkVercelConfig(),
    cli: await checks.checkVercelCLI(),
    endpoint: await checks.checkContactEndpoint(),
    email: false
  };

  // Only test email if basic setup is complete
  if (results.env && results.dependencies && results.resend) {
    results.email = await checks.testEmailSending();
  }

  // Summary
  section('Summary');

  const passed = Object.values(results).filter(r => r === true).length;
  const total = Object.keys(results).length;

  log(`  ${passed}/${total} checks passed`, passed === total ? 'green' : 'yellow');

  if (passed === total) {
    log('\n  🎉 All checks passed! You\'re ready to deploy.', 'green');
    log('\n  Next steps:', 'cyan');
    guidance('Deploy to Vercel: vercel --prod');
    guidance('Or push to git and deploy via Vercel dashboard');
    guidance('Add RESEND_API_KEY to Vercel environment variables');
  } else {
    log('\n  ⚠️  Some checks failed. Please address the issues above.', 'yellow');
    log('\n  Quick setup guide:', 'cyan');
    guidance('1. Create .env file: cp .env.example .env');
    guidance('2. Get Resend API key: https://resend.com/api-keys');
    guidance('3. Add key to .env: RESEND_API_KEY=re_xxxxx');
    guidance('4. Verify domain at: https://resend.com/domains');
    guidance('5. Run this script again: node scripts/validate-deployment.js');
  }

  console.log();
  process.exit(passed === total ? 0 : 1);
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('\n');
  log('❌ Unexpected error occurred:', 'red');
  log(error.message, 'red');
  process.exit(1);
});

main();
