document.addEventListener('DOMContentLoaded', function() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarImage = document.getElementById('avatar');
    
    // 本地存儲鍵名
    const AVATAR_STORAGE_KEY = 'userAvatar';
    
    // 檢查是否有已保存的頭像
    const savedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (savedAvatar) {
        avatarImage.src = savedAvatar;
    }

    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // 驗證文件類型
            if (!file.type.startsWith('image/')) {
                alert('請選擇圖片文件！');
                return;
            }
            
            // 驗證文件大小（最大 5MB）
            if (file.size > 5 * 1024 * 1024) {
                alert('圖片大小不能超過 5MB！');
                return;
            }

            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 更新頭像圖片
                avatarImage.src = e.target.result;
                
                // 保存到本地存儲
                try {
                    localStorage.setItem(AVATAR_STORAGE_KEY, e.target.result);
                } catch (err) {
                    console.error('保存頭像失敗：', err);
                    alert('保存頭像失敗，可能是因為圖片太大。請選擇較小的圖片。');
                }
            };
            
            reader.onerror = function() {
                alert('讀取圖片失敗，請重試！');
            };

            reader.readAsDataURL(file);
        }
    });
});
