const fs = require('fs');
const path = require('path');

class ChatbotIntegrator {
  constructor() {
    this.projectRoot = process.cwd();
    this.htmlFiles = [];
    this.integratedCount = 0;
    this.errorCount = 0;
  }

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

  addChatbotCSS(content) {
    const cssLink = '<link rel="stylesheet" href="css/chatbot.css" />';
    
    if (content.includes('chatbot.css')) {
      return content;
    }
    
    const headEndIndex = content.lastIndexOf('</head>');
    if (headEndIndex !== -1) {
      return content.slice(0, headEndIndex) + 
             `\n    ${cssLink}` + 
             content.slice(headEndIndex);
    }
    
    return content;
  }

  addChatbotJS(content) {
    const jsScripts = [
      '<script src="js/chatbot-database.js"></script>',
      '<script src="js/chatbot-support.js"></script>',
      '<script src="js/chatbot.js"></script>'
    ];
    
    if (content.includes('chatbot.js')) {
      return content;
    }
    
    const bodyEndIndex = content.lastIndexOf('</body>');
    if (bodyEndIndex !== -1) {
      const scripts = jsScripts.join('\n    ');
      return content.slice(0, bodyEndIndex) + 
             `\n    ${scripts}` + 
             content.slice(bodyEndIndex);
    }
    
    return content;
  }

  integrateFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      content = this.addChatbotCSS(content);
      
      content = this.addChatbotJS(content);
      
      fs.writeFileSync(filePath, content, 'utf8');
      
      return true;
    } catch (error) {
      console.error(`Error integrating ${filePath}:`, error.message);
      return false;
    }
  }

  run() {
    console.log('🚀 Bắt đầu tích hợp chatbot vào tất cả các trang...\n');
    
    this.findHtmlFiles();
    
    if (this.htmlFiles.length === 0) {
      console.log('❌ Không tìm thấy file HTML nào!');
      return;
    }
    
    console.log(`📁 Tìm thấy ${this.htmlFiles.length} file HTML\n`);
    
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

const integrator = new ChatbotIntegrator();
integrator.run();
