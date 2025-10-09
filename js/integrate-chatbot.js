const fs = require('fs');
const path = require('path');

/**
 * Script to integrate chatbot into all HTML files
 */
class ChatbotIntegrator {
  constructor() {
    this.projectRoot = process.cwd();
    this.htmlFiles = [];
    this.integratedCount = 0;
    this.errorCount = 0;
  }

  /**
   * Find all HTML files in the project
   */
  findHtmlFiles(dir = this.projectRoot) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.findHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        this.htmlFiles.push(filePath);
      }
    }
  }

  /**
   * Check if chatbot is already integrated
   */
  hasChatbot(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return content.includes('chatbot.css') && 
             content.includes('chatbot.js') && 
             content.includes('chatbot-database.js') && 
             content.includes('chatbot-support.js');
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
      return false;
    }
  }

  /**
   * Add chatbot CSS to HTML file
   */
  addChatbotCSS(content) {
    const cssLink = '<link rel="stylesheet" href="css/chatbot.css" />';
    
    // Check if already exists
    if (content.includes('chatbot.css')) {
      return content;
    }
    
    // Add before closing </head> tag
    const headEndIndex = content.lastIndexOf('</head>');
    if (headEndIndex !== -1) {
      return content.slice(0, headEndIndex) + 
             `\n    ${cssLink}` + 
             content.slice(headEndIndex);
    }
    
    return content;
  }

  /**
   * Add chatbot JavaScript to HTML file
   */
  addChatbotJS(content) {
    const jsScripts = [
      '<script src="js/chatbot-database.js"></script>',
      '<script src="js/chatbot-support.js"></script>',
      '<script src="js/chatbot.js"></script>'
    ];
    
    // Check if already exists
    if (content.includes('chatbot.js')) {
      return content;
    }
    
    // Add before closing </body> tag
    const bodyEndIndex = content.lastIndexOf('</body>');
    if (bodyEndIndex !== -1) {
      const scripts = jsScripts.join('\n    ');
      return content.slice(0, bodyEndIndex) + 
             `\n    ${scripts}` + 
             content.slice(bodyEndIndex);
    }
    
    return content;
  }

  /**
   * Integrate chatbot into a single HTML file
   */
  integrateFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Add chatbot CSS
      content = this.addChatbotCSS(content);
      
      // Add chatbot JavaScript
      content = this.addChatbotJS(content);
      
      // Write back to file
      fs.writeFileSync(filePath, content, 'utf8');
      
      return true;
    } catch (error) {
      console.error(`Error integrating ${filePath}:`, error.message);
      return false;
    }
  }

  /**
   * Run integration process
   */
  run() {
    console.log('🚀 Bắt đầu tích hợp chatbot vào tất cả các trang...\n');
    
    // Find all HTML files
    this.findHtmlFiles();
    
    if (this.htmlFiles.length === 0) {
      console.log('❌ Không tìm thấy file HTML nào!');
      return;
    }
    
    console.log(`📁 Tìm thấy ${this.htmlFiles.length} file HTML\n`);
    
    // Process each HTML file
    for (const filePath of this.htmlFiles) {
      const relativePath = path.relative(this.projectRoot, filePath);
      
      try {
        if (this.hasChatbot(filePath)) {
          console.log(`✅ ${relativePath} - Chatbot đã được tích hợp`);
        } else {
          const success = this.integrateFile(filePath);
          if (success) {
            console.log(`✅ ${relativePath} - Chatbot đã được tích hợp`);
            this.integratedCount++;
          } else {
            console.log(`❌ ${relativePath} - Lỗi khi tích hợp`);
            this.errorCount++;
          }
        }
      } catch (error) {
        console.log(`❌ ${relativePath} - Lỗi: ${error.message}`);
        this.errorCount++;
      }
    }
    
    // Print summary
    console.log(`\n📊 Kết quả tích hợp:`);
    console.log(`✅ Thành công: ${this.integratedCount} trang`);
    console.log(`❌ Lỗi: ${this.errorCount} trang`);
    console.log(`📄 Tổng cộng: ${this.htmlFiles.length} trang`);
    
    if (this.errorCount === 0) {
      console.log('\n🎉 Hoàn thành tích hợp chatbot vào tất cả các trang!');
    } else {
      console.log(`\n⚠️  Hoàn thành với ${this.errorCount} lỗi.`);
    }
  }
}

// Run the integration
const integrator = new ChatbotIntegrator();
integrator.run();
