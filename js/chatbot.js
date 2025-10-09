/**
 * Chatbot Class - Main chatbot functionality
 */
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.database = new ChatbotDatabase();
    this.support = new ChatbotSupport(this);
    
    this.init();
  }

  /**
   * Initialize chatbot
   */
  init() {
    this.createChatbotHTML();
    // Add small delay to ensure DOM is ready
    setTimeout(() => {
      this.bindEvents();
      this.showWelcomeMessage();
      this.addFloatingAnimation();
    }, 100);
  }

  /**
   * Create chatbot HTML structure
   */
  createChatbotHTML() {
    const chatbotHTML = `
      <div id="chatbotContainer">
        <button id="chatbotToggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.35 15.01 2.95 16.32L2 22L7.68 21.05C8.99 21.65 10.46 22 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2ZM12 20C10.74 20 9.54 19.81 8.43 19.46L8 19.29L4.71 20L5.42 16.79L5.25 16.36C4.9 15.25 4.71 14.05 4.71 12.79C4.71 7.31 8.31 3.71 13.79 3.71C19.27 3.71 22.87 7.31 22.87 12.79C22.87 18.27 19.27 21.87 13.79 21.87H12Z" fill="currentColor"/>
            <path d="M8.5 9.5C8.5 8.95 8.95 8.5 9.5 8.5H14.5C15.05 8.5 15.5 8.95 15.5 9.5C15.5 10.05 15.05 10.5 14.5 10.5H9.5C8.95 10.5 8.5 10.05 8.5 9.5Z" fill="currentColor"/>
            <path d="M8.5 12.5C8.5 11.95 8.95 11.5 9.5 11.5H12.5C13.05 11.5 13.5 11.95 13.5 12.5C13.5 13.05 13.05 13.5 12.5 13.5H9.5C8.95 13.5 8.5 13.05 8.5 12.5Z" fill="currentColor"/>
          </svg>
        </button>
        <div id="chatbotWindow">
          <div id="chatbotHeader">
            <h3 id="chatbotTitle">Hỗ trợ khách hàng</h3>
            <button id="chatbotClose">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div id="chatbotMessages"></div>
          <div id="chatbotInput">
            <input type="text" id="messageInput" placeholder="Nhập tin nhắn của bạn...">
            <button id="sendButton">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    const toggle = document.getElementById('chatbotToggle');
    const close = document.getElementById('chatbotClose');
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');

    // Use more specific event handling
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleChatbot();
    });
    
    close.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeChatbot();
    });
    
    sendButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.sendMessage();
    });
    
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Close chatbot when clicking outside (with delay to avoid conflicts)
    document.addEventListener('click', (e) => {
      setTimeout(() => {
        const chatbotContainer = document.getElementById('chatbotContainer');
        const quickActions = document.querySelector('.quick-actions');
        
        // Don't close if clicking on quick actions or chatbot elements
        if (this.isOpen && 
            !chatbotContainer.contains(e.target) && 
            !quickActions?.contains(e.target)) {
          this.closeChatbot();
        }
      }, 150);
    });
  }

  /**
   * Toggle chatbot open/close
   */
  toggleChatbot() {
    console.log('Toggle clicked, current state:', this.isOpen);
    this.removeAnimations();
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }

  /**
   * Open chatbot
   */
  openChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    
    window.style.display = 'flex';
    this.isOpen = true;
    
    // Change icon to close icon
    toggle.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    // Focus on input
    setTimeout(() => {
      document.getElementById('messageInput').focus();
    }, 100);
  }

  /**
   * Close chatbot
   */
  closeChatbot() {
    const window = document.getElementById('chatbotWindow');
    const toggle = document.getElementById('chatbotToggle');
    
    window.style.display = 'none';
    this.isOpen = false;
    
    // Change icon back to chat icon
    toggle.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.35 15.01 2.95 16.32L2 22L7.68 21.05C8.99 21.65 10.46 22 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2ZM12 20C10.74 20 9.54 19.81 8.43 19.46L8 19.29L4.71 20L5.42 16.79L5.25 16.36C4.9 15.25 4.71 14.05 4.71 12.79C4.71 7.31 8.31 3.71 13.79 3.71C19.27 3.71 22.87 7.31 22.87 12.79C22.87 18.27 19.27 21.87 13.79 21.87H12Z" fill="currentColor"/>
        <path d="M8.5 9.5C8.5 8.95 8.95 8.5 9.5 8.5H14.5C15.05 8.5 15.5 8.95 15.5 9.5C15.5 10.05 15.05 10.5 14.5 10.5H9.5C8.95 10.5 8.5 10.05 8.5 9.5Z" fill="currentColor"/>
        <path d="M8.5 12.5C8.5 11.95 8.95 11.5 9.5 11.5H12.5C13.05 11.5 13.5 11.95 13.5 12.5C13.5 13.05 13.05 13.5 12.5 13.5H9.5C8.95 13.5 8.5 13.05 8.5 12.5Z" fill="currentColor"/>
      </svg>
    `;
  }

  /**
   * Send message
   */
  sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
      this.addUserMessage(message);
      input.value = '';
      this.processMessage(message);
    }
  }

  /**
   * Add user message to chat
   */
  addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.textContent = message;
    
    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  /**
   * Add bot message to chat
   */
  addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = message.replace(/\n/g, '<br>');
    
    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  /**
   * Process user message and generate response
   */
  processMessage(message) {
    // Show typing indicator
    this.showTypingIndicator();
    
    // Simulate processing delay
    setTimeout(() => {
      this.hideTypingIndicator();
      
      // Get response from database
      const response = this.database.findResponse(message);
      
      if (response) {
        this.addBotMessage(response.message);
        
        // Show quick actions if available
        if (response.quickActions) {
          this.showQuickActionsForCategory(response.quickActions);
        }
      } else {
        // Try to detect intent
        const intent = this.detectIntent(message);
        this.handleIntent(intent, message);
      }
    }, 1000 + Math.random() * 1000);
  }

  /**
   * Detect user intent
   */
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello') || 
        lowerMessage.includes('hi') || lowerMessage.includes('chào')) {
      return 'greeting';
    }
    
    // Product inquiry patterns
    if (lowerMessage.includes('laptop') || lowerMessage.includes('máy tính') || 
        lowerMessage.includes('sản phẩm') || lowerMessage.includes('mua')) {
      return 'product_inquiry';
    }
    
    // Support patterns
    if (lowerMessage.includes('hỗ trợ') || lowerMessage.includes('giúp') || 
        lowerMessage.includes('tư vấn') || lowerMessage.includes('chat')) {
      return 'support';
    }
    
    // Price patterns
    if (lowerMessage.includes('giá') || lowerMessage.includes('tiền') || 
        lowerMessage.includes('rẻ') || lowerMessage.includes('đắt')) {
      return 'price';
    }
    
    // Warranty patterns
    if (lowerMessage.includes('bảo hành') || lowerMessage.includes('warranty') || 
        lowerMessage.includes('sửa chữa')) {
      return 'warranty';
    }
    
    return 'unknown';
  }

  /**
   * Handle detected intent
   */
  handleIntent(intent, message) {
    switch (intent) {
      case 'greeting':
        this.addBotMessage('👋 Xin chào! Tôi có thể giúp gì cho bạn?');
        this.showQuickActionsForCategory('main');
        break;
        
      case 'product_inquiry':
        this.addBotMessage('💻 Tôi có thể giúp bạn tìm hiểu về các sản phẩm laptop. Bạn quan tâm đến thương hiệu nào?');
        this.showQuickActionsForCategory('products');
        break;
        
      case 'support':
        this.addBotMessage('🆘 Tôi có thể kết nối bạn với nhân viên hỗ trợ. Bạn có muốn chat trực tiếp không?');
        this.showQuickActionsForCategory('support');
        break;
        
      case 'price':
        this.addBotMessage('💰 Tôi có thể cung cấp thông tin về giá cả. Bạn quan tâm đến sản phẩm nào?');
        this.showQuickActionsForCategory('products');
        break;
        
      case 'warranty':
        this.addBotMessage('🛡️ Tôi có thể cung cấp thông tin về chính sách bảo hành. Bạn cần hỗ trợ gì?');
        this.showQuickActionsForCategory('warranty');
        break;
        
      default:
        this.addBotMessage(this.database.getDefaultResponse());
        this.showQuickActionsForCategory('main');
    }
  }

  /**
   * Show quick actions for a category
   */
  showQuickActionsForCategory(category) {
    const quickActions = this.database.getQuickActions(category);
    if (quickActions && quickActions.length > 0) {
      this.showQuickActions(quickActions);
    }
  }

  /**
   * Show quick action buttons
   */
  showQuickActions(actions) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'quick-actions';
    
    actions.forEach(action => {
      const button = document.createElement('button');
      button.className = 'quick-action-btn';
      button.textContent = action.text;
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleQuickAction(action);
      });
      actionsDiv.appendChild(button);
    });
    
    messagesContainer.appendChild(actionsDiv);
    this.scrollToBottom();
  }

  /**
   * Handle quick action click
   */
  handleQuickAction(action) {
    console.log('Quick action clicked:', action.text);
    
    // Remove quick actions
    const quickActions = document.querySelector('.quick-actions');
    if (quickActions) {
      quickActions.remove();
    }
    
    // Add user message
    this.addUserMessage(action.text);
    
    // Handle specific actions
    if (action.action === 'live_chat') {
      this.support.initiateSupportTransfer();
    } else if (action.action === 'products') {
      this.addBotMessage('💻 Dưới đây là các sản phẩm laptop phổ biến:');
      this.showQuickActionsForCategory('brands');
    } else if (action.action === 'warranty') {
      this.addBotMessage('🛡️ Thông tin về chính sách bảo hành:');
      this.addBotMessage('• Bảo hành 12-24 tháng tùy sản phẩm\n• Hỗ trợ sửa chữa tại trung tâm\n• Đổi mới trong 7 ngày đầu\n• Bảo hành toàn cầu cho một số model');
    } else {
      // Process as regular message
      this.processMessage(action.text);
    }
  }

  /**
   * Show welcome message
   */
  showWelcomeMessage() {
    setTimeout(() => {
      this.addBotMessage(this.database.getWelcomeMessage());
      this.showQuickActionsForCategory('main');
    }, 500);
  }

  /**
   * Show typing indicator
   */
  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <span>Đang nhập</span>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  /**
   * Hide typing indicator
   */
  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  /**
   * Scroll to bottom of messages
   */
  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Add floating animation to toggle button
   */
  addFloatingAnimation() {
    const toggle = document.getElementById('chatbotToggle');
    if (toggle) {
      // Add floating animation after 2 seconds
      setTimeout(() => {
        toggle.classList.add('floating');
      }, 2000);
      
      // Add pulse animation when user hasn't interacted
      setTimeout(() => {
        if (!this.isOpen) {
          toggle.classList.add('pulse');
        }
      }, 10000);
    }
  }

  /**
   * Remove animations when user interacts
   */
  removeAnimations() {
    const toggle = document.getElementById('chatbotToggle');
    if (toggle) {
      toggle.classList.remove('pulse', 'floating');
    }
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chatbot = new Chatbot();
});
