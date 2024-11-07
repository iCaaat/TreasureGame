// 定义寻宝故事类
class InteractiveTreasureHunt {
    static async getMapFragment() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return "你找到了神秘的藏宝图碎片！";
    }

    static async decipherMap() {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return "图案解密成功！位置指向幽暗的森林...";
    }

    static async exploreForest() {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const options = [
            { text: "沿着小路继续前行", result: "发现一座古庙的入口...", img: "庙.png" },
            { text: "绕路避开密林", result: "走到了一个湖泊旁...", img: "湖泊.png" }
        ];
        return options;
    }

    static async searchTemple() {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const success = Math.random() > 0.3;
        if (success) {
            return "成功避开守卫，找到了宝箱！";
        } else {
            throw "遇到了神庙守卫！";
        }
    }

    static async openTreasureChest() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return "恭喜！你发现了传说中的宝藏！";
    }
}

// 显示信息并增加动画效果
function displayMessage(message, isError = false, imgName = null) {
    const outputDiv = document.getElementById('output');
    
    // 创建文本段落元素
    const p = document.createElement('p');
    p.classList.add('message');
    p.textContent = message;
    if (isError) {
        p.classList.add('error');
    }
    outputDiv.appendChild(p);
    
    // 如果指定了图片名称，则创建图片元素
    if (imgName) {
        const img = document.createElement('img');
        img.src = `img/${imgName}`;
        img.alt = "情节图片";
        img.width = 20;
        img.height = 20;
        img.classList.add('message-image'); // 添加图片样式
        p.appendChild(img); // 将图片添加到段落中
    }

    setTimeout(() => p.classList.add('visible'), 50);
}

// 清除上一个选择并显示新选项
function clearChoices() {
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
}

// 创建选择按钮并添加事件监听
function displayChoices(options, callback) {
    const choicesDiv = document.getElementById('choices');
    clearChoices();
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.classList.add('choice-button');
        
        button.addEventListener('click', () => {
            clearChoices();
            displayMessage(option.result, false, option.img); // 显示选择结果并带图片
            callback(option);
        });
        
        choicesDiv.appendChild(button);
    });
}

// 主故事流程
async function startAdventure() {
    try {
        const mapFragment = await InteractiveTreasureHunt.getMapFragment();
        displayMessage(mapFragment, false, "地图.png");

        const decipheredLocation = await InteractiveTreasureHunt.decipherMap();
        displayMessage(decipheredLocation, false, "解读.png");

        // 进入森林选择路径
        const forestOptions = await InteractiveTreasureHunt.exploreForest();
        displayChoices(forestOptions, async (choice) => {
            if (choice.text.includes("小路")) {
                const templeOutcome = await InteractiveTreasureHunt.searchTemple();
                displayMessage(templeOutcome, false, "守护者.png");

                const treasure = await InteractiveTreasureHunt.openTreasureChest();
                displayMessage(treasure, false, "宝藏.png");

            } else if (choice.text.includes("绕路")) {
                displayMessage("绕路没有发现宝藏，冒险失败！", true, "死亡登记.png");
            }
        });

    } catch (error) {
        displayMessage("任务失败: " + error, true, "error.png");
    }
}

// 启动寻宝过程
startAdventure();
