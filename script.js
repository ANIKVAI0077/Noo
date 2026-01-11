// ওয়েবসাইট লোড হওয়ার পর
document.addEventListener('DOMContentLoaded', function() {
    console.log('ইসলামিক গাইড ওয়েবসাইট লোড হয়েছে');
    
    // ট্যাব এলিমেন্টস সিলেক্ট
    const janajaTab = document.getElementById('janaja-tab');
    const qoborTab = document.getElementById('qobor-tab');
    const duaTab = document.getElementById('dua-tab');
    
    // সেকশন এলিমেন্টস সিলেক্ট
    const janajaSection = document.getElementById('janaja-section');
    const qoborSection = document.getElementById('qobor-section');
    const duaSection = document.getElementById('dua-section');
    
    // সকল ট্যাব ও সেকশন সংগ্রহ
    const allTabs = [janajaTab, qoborTab, duaTab];
    const allSections = [janajaSection, qoborSection, duaSection];
    
    // গ্লোবাল ট্যাব সুইচিং ফাংশন
    window.switchToTab = function(tabName) {
        let selectedTab;
        
        if (tabName === 'janaja') {
            selectedTab = janajaTab;
        } else if (tabName === 'qobor') {
            selectedTab = qoborTab;
        } else if (tabName === 'dua') {
            selectedTab = duaTab;
        } else {
            selectedTab = janajaTab;
        }
        
        switchTab(selectedTab);
        return false; // লিংকের ডিফল্ট behavior বন্ধ করতে
    };
    
    // ট্যাব সুইচিং ফাংশন
    function switchTab(selectedTab) {
        // প্রথমে সকল ট্যাব ও সেকশন থেকে active ক্লাস রিমুভ
        allTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.style.transform = 'translateY(0)';
        });
        
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // নির্বাচিত ট্যাবে active ক্লাস অ্যাড
        selectedTab.classList.add('active');
        selectedTab.style.transform = 'translateY(-2px)';
        
        // সংশ্লিষ্ট সেকশন শো
        if (selectedTab === janajaTab) {
            janajaSection.classList.add('active');
        } else if (selectedTab === qoborTab) {
            qoborSection.classList.add('active');
        } else if (selectedTab === duaTab) {
            duaSection.classList.add('active');
        }
        
        // URL হ্যাশ আপডেট
        updateUrlHash(selectedTab.id);
        
        // ট্যাব পরিবর্তন নোটিফিকেশন
        showTabNotification(selectedTab);
        
        // পেজের উপরে স্ক্রোল
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // URL হ্যাশ আপডেট ফাংশন
    function updateUrlHash(tabId) {
        const hash = tabId.replace('-tab', '');
        window.history.replaceState(null, null, `#${hash}`);
    }
    
    // ট্যাব পরিবর্তন নোটিফিকেশন
    function showTabNotification(tab) {
        const tabName = tab.querySelector('span').textContent;
        console.log(`সক্রিয় ট্যাব: ${tabName}`);
        
        // মোবাইলে ছোট নোটিফিকেশন
        if (window.innerWidth < 768) {
            showMobileNotification(tabName);
        }
    }
    
    // মোবাইল নোটিফিকেশন
    function showMobileNotification(tabName) {
        const notification = document.createElement('div');
        notification.className = 'mobile-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--primary-color);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                font-size: 14px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideDown 0.3s ease;
            ">
                <i class="fas fa-check-circle"></i> ${tabName} খোলা হয়েছে
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
    
    // ট্যাবগুলিতে ক্লিক ইভেন্ট যোগ
    janajaTab.addEventListener('click', () => switchTab(janajaTab));
    qoborTab.addEventListener('click', () => switchTab(qoborTab));
    duaTab.addEventListener('click', () => switchTab(duaTab));
    
    // আরবি টেক্সটে কপি ফিচার
    function initCopyToClipboard() {
        const arabicTexts = document.querySelectorAll('.arabic-text');
        
        arabicTexts.forEach(text => {
            // টুলটিপ যোগ
            text.title = 'দোয়া কপি করতে ক্লিক করুন';
            text.style.cursor = 'pointer';
            
            text.addEventListener('click', function() {
                const textToCopy = this.textContent.trim();
                
                // ক্লিপবোর্ডে কপি
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // সফল কপি ফিডব্যাক
                    showCopySuccess(this);
                }).catch(err => {
                    // ফেলব্যাক মেথড
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    showCopySuccess(this);
                });
            });
        });
    }
    
    // কপি সফল ফিডব্যাক
    function showCopySuccess(element) {
        const originalColor = element.style.color;
        const originalBg = element.style.backgroundColor;
        
        element.style.color = '#159895';
        element.style.backgroundColor = 'rgba(21, 152, 149, 0.1)';
        element.style.transition = 'all 0.3s ease';
        
        // টেম্পোরারি টুলটিপ
        const originalTitle = element.title;
        element.title = 'দোয়া কপি হয়েছে! ✓';
        
        // নোটিফিকেশন শো
        showNotification('দোয়া কপি হয়েছে!', 'success');
        
        setTimeout(() => {
            element.style.color = originalColor;
            element.style.backgroundColor = originalBg;
            element.title = originalTitle;
        }, 1500);
    }
    
    // জেনারেল নোটিফিকেশন
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        let bgColor = 'var(--primary-color)';
        if (type === 'success') bgColor = 'var(--green-color)';
        if (type === 'error') bgColor = '#f44336';
        
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${bgColor};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 14px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideInRight 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 300px;
            ">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // কার্ড হোভার এফেক্ট
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.step-card, .guide-card, .dua-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // সূরাহ আইটেম ক্লিক ইভেন্ট
    function initSuraClickEvents() {
        const suraItems = document.querySelectorAll('.sura-item');
        
        suraItems.forEach(item => {
            item.addEventListener('click', function() {
                const suraName = this.querySelector('.sura-name').textContent;
                showNotification(`আপনি নির্বাচিত করেছেন: ${suraName}`, 'info');
            });
        });
    }
    
    // সোশ্যাল মিডিয়া শেয়ার ফিচার
    function initSocialShare() {
        // WhatsApp শেয়ার
        const waButtons = document.querySelectorAll('.wa-btn, .floating-wa');
        waButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const url = window.location.href;
                const text = 'ইসলামিক গাইড - জানাজা ও কবর জিয়ারতের পূর্ণাঙ্গ নির্দেশনা দেখুন: ' + url;
                const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                
                // নতুন ট্যাবে ওপেন
                setTimeout(() => {
                    window.open(waUrl, '_blank');
                }, 100);
            });
        });
        
        // Facebook শেয়ার
        const fbButtons = document.querySelectorAll('.fb-btn, .floating-fb');
        fbButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const url = window.location.href;
                const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                
                // নতুন ট্যাবে ওপেন
                setTimeout(() => {
                    window.open(fbUrl, '_blank');
                }, 100);
            });
        });
    }
    
    // ওয়েবসাইট স্ট্যাটাস শো
    function showWebsiteStatus() {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'website-status';
        statusDiv.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background: var(--primary-color); color: white; padding: 10px 20px; border-radius: 25px; font-size: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000;">
                <i class="fas fa-check-circle"></i> ইসলামিক গাইড লোড হয়েছে
            </div>
        `;
        document.body.appendChild(statusDiv);
        
        setTimeout(() => {
            statusDiv.style.opacity = '0';
            statusDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                statusDiv.remove();
            }, 500);
        }, 3000);
    }
    
    // কাস্টম CSS এনিমেশন যোগ
    function addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translate(-50%, -100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translate(-50%, 0); opacity: 1; }
                to { transform: translate(-50%, -100%); opacity: 0; }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .mobile-notification {
                animation: slideDown 0.3s ease;
            }
            
            .notification {
                animation: slideInRight 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ইনিশিয়ালাইজেশন ফাংশন কল
    function initializeWebsite() {
        // প্রথমে ডিফল্ট ট্যাব সেট
        setTabFromHash();
        
        // কাস্টম এনিমেশন যোগ
        addCustomAnimations();
        
        // অন্যান্য ফাংশন ইনিশিয়ালাইজ
        initCopyToClipboard();
        initCardHoverEffects();
        initSuraClickEvents();
        initSocialShare();
        
        // ওয়েবসাইট স্ট্যাটাস শো
        showWebsiteStatus();
        
        console.log('ওয়েবসাইট সম্পূর্ণভাবে ইনিশিয়ালাইজ হয়েছে');
    }
    
    // URL হ্যাশ থেকে ট্যাব সেট
    function setTabFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash === 'qobor') {
            switchTab(qoborTab);
        } else if (hash === 'dua') {
            switchTab(duaTab);
        } else {
            switchTab(janajaTab);
        }
    }
    
    // ওয়েবসাইট ইনিশিয়ালাইজ
    initializeWebsite();
    
    // হ্যাশ পরিবর্তন হলে ট্যাব আপডেট
    window.addEventListener('hashchange', setTabFromHash);
    
    // পেজ লোড হওয়ার পর এনিমেশন
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // WhatsApp API লোড (ঐচ্ছিক)
        loadWhatsAppAPI();
    });
    
    // WhatsApp API লোড
    function loadWhatsAppAPI() {
        // WhatsApp Web API সেটআপ
        console.log('WhatsApp API প্রস্তুত');
    }
    
    // এরর হ্যান্ডলিং
    window.onerror = function(message, source, lineno, colno, error) {
        console.error('ওয়েবসাইটে এরর:', message);
        
        // ইউজারকে নোটিফাই
        if (!message.includes('favicon')) {
            showNotification('ওয়েবসাইটে একটি সমস্যা হয়েছে', 'error');
        }
        
        return true;
    };
    
    // সোশ্যাল মিডিয়া বাটনে হোভার ইফেক্ট
    function initSocialHoverEffects() {
        const socialButtons = document.querySelectorAll('.social-link, .footer-social-btn, .floating-wa, .floating-fb');
        
        socialButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                if (this.classList.contains('floating-wa') || this.classList.contains('floating-fb')) {
                    this.style.transform = 'scale(1.1)';
                }
            });
            
            btn.addEventListener('mouseleave', function() {
                if (this.classList.contains('floating-wa') || this.classList.contains('floating-fb')) {
                    this.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    initSocialHoverEffects();
});
