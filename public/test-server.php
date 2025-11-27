<?php
/**
 * Server Diagnostic Tool for StockMarket.io
 * Upload this file to test your Hostinger server configuration
 * Visit: https://thestockmarket.io/test-server.php
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Diagnostics - StockMarket.io</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .success { color: #27ae60; background: #d5f4e6; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .warning { color: #f39c12; background: #fef9e7; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .error { color: #e74c3c; background: #fadbd8; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .info { color: #3498db; background: #ebf3fd; padding: 10px; border-radius: 5px; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .code { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🔧 Server Diagnostics for StockMarket.io</h1>
    <p>This page helps diagnose why SPA routing might not be working on your Hostinger server.</p>
    
    <h2>📊 Server Information</h2>
    <table>
        <tr><th>Server Software</th><td><?= $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown' ?></td></tr>
        <tr><th>PHP Version</th><td><?= phpversion() ?></td></tr>
        <tr><th>Document Root</th><td><?= $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown' ?></td></tr>
        <tr><th>Server Name</th><td><?= $_SERVER['SERVER_NAME'] ?? 'Unknown' ?></td></tr>
        <tr><th>Request Method</th><td><?= $_SERVER['REQUEST_METHOD'] ?? 'Unknown' ?></td></tr>
        <tr><th>Request URI</th><td><?= $_SERVER['REQUEST_URI'] ?? 'Unknown' ?></td></tr>
    </table>
    
    <h2>🔍 Apache Modules Check</h2>
    <?php if (function_exists('apache_get_modules')): ?>
        <?php $modules = apache_get_modules(); ?>
        <div class="success">✅ Apache modules can be detected</div>
        
        <h3>Critical Modules for SPA Routing:</h3>
        <?php
        $critical_modules = ['mod_rewrite', 'mod_headers', 'mod_deflate', 'mod_expires'];
        foreach ($critical_modules as $module):
            if (in_array($module, $modules)):
        ?>
                <div class="success">✅ <?= $module ?> is enabled</div>
        <?php else: ?>
                <div class="error">❌ <?= $module ?> is NOT enabled</div>
        <?php endif; endforeach; ?>
        
        <details>
            <summary>All Available Modules (<?= count($modules) ?>)</summary>
            <div class="code">
                <?= implode(', ', $modules) ?>
            </div>
        </details>
    <?php else: ?>
        <div class="warning">⚠️ Cannot detect Apache modules (server might be nginx or IIS)</div>
    <?php endif; ?>
    
    <h2>📁 File System Check</h2>
    <?php
    $files_to_check = [
        'index.html' => 'Main React app file',
        '.htaccess' => 'Apache URL rewriting rules',
        'web.config' => 'IIS URL rewriting rules',
        '_redirects' => 'Netlify-style redirects',
        'index.php' => 'PHP routing fallback'
    ];
    
    foreach ($files_to_check as $file => $description):
        if (file_exists($file)):
    ?>
            <div class="success">✅ <?= $file ?> exists (<?= $description ?>)</div>
    <?php else: ?>
            <div class="warning">⚠️ <?= $file ?> missing (<?= $description ?>)</div>
    <?php endif; endforeach; ?>
    
    <h2>🌐 URL Testing</h2>
    <div class="info">
        <strong>Test these URLs manually:</strong><br>
        • <a href="/" target="_blank"><?= 'https://' . $_SERVER['SERVER_NAME'] ?>/</a> (Home - should work)<br>
        • <a href="/start-learning" target="_blank"><?= 'https://' . $_SERVER['SERVER_NAME'] ?>/start-learning</a> (SPA route - main test)<br>
        • <a href="/blog" target="_blank"><?= 'https://' . $_SERVER['SERVER_NAME'] ?>/blog</a> (SPA route)<br>
        • <a href="/contact" target="_blank"><?= 'https://' . $_SERVER['SERVER_NAME'] ?>/contact</a> (SPA route)<br>
        • <a href="/nonexistent" target="_blank"><?= 'https://' . $_SERVER['SERVER_NAME'] ?>/nonexistent</a> (Should show React 404)
    </div>
    
    <h2>🔧 Recommendations</h2>
    
    <?php if (!function_exists('apache_get_modules')): ?>
        <div class="warning">
            <strong>⚠️ Server Type Issue</strong><br>
            Your server might not be Apache (could be nginx or IIS). Try these solutions:
            <ol>
                <li>Use the <code>web.config</code> file for IIS servers</li>
                <li>Use the <code>index.php</code> routing fallback</li>
                <li>Contact Hostinger support to confirm server type</li>
            </ol>
        </div>
    <?php elseif (!in_array('mod_rewrite', apache_get_modules())): ?>
        <div class="error">
            <strong>❌ mod_rewrite Disabled</strong><br>
            The critical mod_rewrite module is not enabled. Contact Hostinger support to enable it, or use the PHP routing fallback.
        </div>
    <?php else: ?>
        <div class="success">
            <strong>✅ Apache Configuration Looks Good</strong><br>
            Your server appears to support .htaccess files. If routing still doesn't work:
            <ol>
                <li>Ensure .htaccess file is uploaded correctly</li>
                <li>Check file permissions (should be 644)</li>
                <li>Try the PHP routing fallback as backup</li>
            </ol>
        </div>
    <?php endif; ?>
    
    <?php if (!file_exists('index.html')): ?>
        <div class="error">
            <strong>❌ Missing index.html</strong><br>
            Your React build files are not uploaded. Run <code>npm run build</code> and upload the contents of the <code>dist/</code> folder.
        </div>
    <?php endif; ?>
    
    <h2>🚀 Next Steps</h2>
    <div class="info">
        <strong>Choose your solution based on the diagnostics above:</strong>
        <ol>
            <li><strong>If Apache + mod_rewrite works:</strong> Use .htaccess (should be automatic)</li>
            <li><strong>If server is IIS:</strong> Use web.config file</li>
            <li><strong>If nothing works:</strong> Use index.php routing fallback (universal solution)</li>
            <li><strong>Last resort:</strong> Contact Hostinger support with this diagnostic info</li>
        </ol>
    </div>
    
    <div class="warning">
        <strong>🗑️ Security Note:</strong> Delete this test-server.php file after diagnosis to avoid exposing server information.
    </div>
    
    <hr>
    <p><em>Generated on <?= date('Y-m-d H:i:s') ?> | StockMarket.io Server Diagnostics</em></p>
</body>
</html>