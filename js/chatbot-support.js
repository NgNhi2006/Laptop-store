
class ChatbotSupport {
  constructor(chatbot) {
    this.chatbot = chatbot;
    this.isConnecting = false;
    this.supportAgent = null;
  }

  initiateSupportTransfer() {
    if (this.isConnecting) {
      return;
    }

    this.chatbot.addBotMessage('🔄 Đang kết nối với nhân viên hỗ trợ...');
    
    this.startConnection();
  }

  startConnection() {
    this.isConnecting = true;
    
    setTimeout(() => {
      this.isConnecting = false;
      
      const currentPath = window.location.pathname;
      const isSubPage = currentPath.includes('/products/') || currentPath.includes('/news/') || currentPath.includes('/privacypolicy/');
      const avatarPath = isSubPage ? '../../img/Store-employee/mackhoa.jpg' : 'img/Store-employee/mackhoa.jpg';
      
      this.supportAgent = {
        name: 'Mạc Văn Khoa',
        title: 'Nhân viên kỹ thuật',
        avatar: avatarPath,
        isOnline: true
      };
      
      this.chatbot.addBotMessage(`🎉 Đã kết nối với nhân viên tư vấn!\n\n👨‍💼 ${this.supportAgent.name} - ${this.supportAgent.title}\n📋 Ticket: ${this.generateTicketId()}\n\nNhân viên sẽ hỗ trợ bạn ngay bây giờ.`);
      
      this.showAgentInfo();
      
    }, 3000);
  }

  generateTicketId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TK-${timestamp}-${random}`.toUpperCase();
  }

  showAgentInfo() {
    const agentInfo = document.createElement('div');
    agentInfo.className = 'agent-info';
    agentInfo.innerHTML = `
      <div class="agent-card">
        <div class="agent-avatar">
          <img src="${this.supportAgent.avatar}" alt="${this.supportAgent.name}" />
        </div>
        <div class="agent-details">
          <h4>${this.supportAgent.name}</h4>
          <p>${this.supportAgent.title}</p>
          <span class="status online">🟢 Đang hoạt động</span>
        </div>
      </div>
      
      <div class="technical-info">
        <div class="contact-header" onclick="toggleContactDetails()">
          <h4>📞 Thông Tin Liên Hệ</h4>
          <span class="toggle-icon">▼</span>
        </div>
        <div class="contact-details" id="contactDetails" style="display: none;">
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <div class="contact-details">
                <strong>Hotline</strong>
                <p>0967 359 543</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">💬</div>
              <div class="contact-details">
                <strong>Zalo</strong>
                <p>0862744098</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-details">
                <strong>Email</strong>
                <p>tniw.dev@gmail.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">🕒</div>
              <div class="contact-details">
                <strong>Giờ Làm Việc</strong>
                <p>8:00 - 17:00 (T2-T6)</p>
              </div>
            </div>
          </div>
          <div class="action-buttons">
            <a href="tel:0967359543" class="action-btn call-btn">
              <i class="fas fa-phone"></i> Gọi Ngay
            </a>
            <a href="https://zalo.me/0862744098" target="_blank" class="action-btn zalo-btn">
              <i class="fab fa-zalo"></i> Chat Zalo
            </a>
            <a href="mailto:tniw.dev@gmail.com" class="action-btn email-btn">
              <i class="fas fa-envelope"></i> Gửi Email
            </a>
          </div>
        </div>
      </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .agent-card {
        display: flex;
        align-items: center;
        gap: 15px;
        background: #e3f2fd;
        border: 1px solid #2196f3;
        border-radius: 10px;
        padding: 15px;
        margin: 10px 0;
      }
      .agent-avatar {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #2196f3;
        box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
      }
      .agent-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .agent-details h4 {
        margin: 0;
        color: #1976d2;
        font-size: 16px;
      }
      .agent-details p {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
      }
      .status {
        font-size: 12px;
        font-weight: bold;
      }
      .status.online {
        color: #4caf50;
      }
      
      .technical-info {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 12px;
        padding: 0;
        margin: 15px 0;
        overflow: hidden;
      }
      
      .contact-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: #e3f2fd;
        cursor: pointer;
        transition: all 0.3s ease;
        border-bottom: 1px solid #dee2e6;
      }
      
      .contact-header:hover {
        background: #bbdefb;
      }
      
      .contact-header h4 {
        margin: 0;
        color: #1976d2;
        font-size: 16px;
        font-weight: bold;
      }
      
      .toggle-icon {
        font-size: 14px;
        color: #1976d2;
        transition: transform 0.3s ease;
      }
      
      .contact-header.active .toggle-icon {
        transform: rotate(180deg);
      }
      
      .contact-details {
        padding: 20px;
      }
      
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: white;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        transition: all 0.3s ease;
      }
      
      .contact-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
        border-color: #007bff;
      }
      
      .contact-icon {
        font-size: 24px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e3f2fd;
        border-radius: 50%;
        border: 2px solid #2196f3;
      }
      
      .contact-details strong {
        display: block;
        color: #333;
        font-size: 14px;
        margin-bottom: 4px;
      }
      
      .contact-details p {
        margin: 0;
        color: #666;
        font-size: 13px;
        font-weight: 500;
      }
      
      .action-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .action-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: bold;
        font-size: 14px;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        min-width: 120px;
        justify-content: center;
      }
      
      .call-btn {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        border-color: #28a745;
      }
      
      .call-btn:hover {
        background: linear-gradient(135deg, #20c997 0%, #28a745 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
      }
      
      .zalo-btn {
        background: linear-gradient(135deg, #0068ff 0%, #00a8ff 100%);
        color: white;
        border-color: #0068ff;
      }
      
      .zalo-btn:hover {
        background: linear-gradient(135deg, #00a8ff 0%, #0068ff 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 104, 255, 0.3);
      }
      
      .email-btn {
        background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
        color: white;
        border-color: #6c757d;
      }
      
      .email-btn:hover {
        background: linear-gradient(135deg, #495057 0%, #6c757d 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(108, 117, 125, 0.3);
      }
      
      @media (max-width: 768px) {
        .contact-grid {
          grid-template-columns: 1fr;
        }
        
        .action-buttons {
          flex-direction: column;
          align-items: center;
        }
        
        .action-btn {
          width: 100%;
          max-width: 200px;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.getElementById('chatbotMessages').appendChild(agentInfo);
    
    window.toggleContactDetails = function() {
      const details = document.getElementById('contactDetails');
      const header = document.querySelector('.contact-header');
      const icon = document.querySelector('.toggle-icon');
      
      if (details.style.display === 'none') {
        details.style.display = 'block';
        header.classList.add('active');
        icon.textContent = '▲';
      } else {
        details.style.display = 'none';
        header.classList.remove('active');
        icon.textContent = '▼';
      }
    };
  }

  sendNotification(supportRequest) {
    
    console.log('Support request sent:', supportRequest);
  }
}