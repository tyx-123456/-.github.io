function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 导航栏激活状态
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 初始化知识图谱 - 使用 vis-network
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('graph-container');
    if (!container) return;

    // 检查是否加载了 vis-network 库
    if (typeof vis === 'undefined') {
        // 动态加载 vis-network 库
        loadVisNetwork().then(initKnowledgeGraph).catch(showFallbackGraph);
    } else {
        initKnowledgeGraph();
    }

    function loadVisNetwork() {
        return new Promise((resolve, reject) => {
            // 加载 CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/vis-network/styles/vis-network.min.css';
            document.head.appendChild(link);

            // 加载 JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/vis-network/standalone/umd/vis-network.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function initKnowledgeGraph() {
        // 创建节点数据
        const nodes = new vis.DataSet([
            { id: 1, label: "磁共振成像\n(MRI)", color: { background: "#00ffff", border: "#00cccc" }, font: { size: 18, color: "#000000" }, shape: "circle", size: 40 },
            { id: 2, label: "物理原理", color: { background: "#ff00ff", border: "#cc00cc" }, font: { color: "#ffffff" }, shape: "box" },
            { id: 3, label: "成像序列", color: { background: "#00ff00", border: "#00cc00" }, font: { color: "#000000" }, shape: "box" },
            { id: 4, label: "临床应用", color: { background: "#ffff00", border: "#cccc00" }, font: { color: "#000000" }, shape: "box" },
            { id: 5, label: "技术参数", color: { background: "#ff9900", border: "#cc7700" }, font: { color: "#000000" }, shape: "box" },
            { id: 6, label: "核磁共振", color: { background: "#9900ff", border: "#7700cc" }, font: { color: "#ffffff" } },
            { id: 7, label: "弛豫时间", color: { background: "#00ff99", border: "#00cc77" }, font: { color: "#000000" } },
            { id: 8, label: "T1加权", color: { background: "#ff0099", border: "#cc0077" }, font: { color: "#ffffff" } },
            { id: 9, label: "T2加权", color: { background: "#99ff00", border: "#77cc00" }, font: { color: "#000000" } },
            { id: 10, label: "FLAIR", color: { background: "#0099ff", border: "#0077cc" }, font: { color: "#ffffff" } },
            { id: 11, label: "神经系统", color: { background: "#ff6666", border: "#cc5252" }, font: { color: "#000000" } },
            { id: 12, label: "心血管", color: { background: "#66ff66", border: "#52cc52" }, font: { color: "#000000" } },
            { id: 13, label: "肌肉骨骼", color: { background: "#6666ff", border: "#5252cc" }, font: { color: "#ffffff" } },
            { id: 14, label: "TR/TE", color: { background: "#ffcc00", border: "#cca300" }, font: { color: "#000000" } },
            { id: 15, label: "翻转角", color: { background: "#00ccff", border: "#00a3cc" }, font: { color: "#000000" } }
        ]);

        // 创建边数据
        const edges = new vis.DataSet([
            { from: 1, to: 2, arrows: "to", color: { color: "#ff00ff" } },
            { from: 1, to: 3, arrows: "to", color: { color: "#00ff00" } },
            { from: 1, to: 4, arrows: "to", color: { color: "#ffff00" } },
            { from: 1, to: 5, arrows: "to", color: { color: "#ff9900" } },
            { from: 2, to: 6, arrows: "to", color: { color: "#9900ff" } },
            { from: 2, to: 7, arrows: "to", color: { color: "#00ff99" } },
            { from: 3, to: 8, arrows: "to", color: { color: "#ff0099" } },
            { from: 3, to: 9, arrows: "to", color: { color: "#99ff00" } },
            { from: 3, to: 10, arrows: "to", color: { color: "#0099ff" } },
            { from: 4, to: 11, arrows: "to", color: { color: "#ff6666" } },
            { from: 4, to: 12, arrows: "to", color: { color: "#66ff66" } },
            { from: 4, to: 13, arrows: "to", color: { color: "#6666ff" } },
            { from: 5, to: 14, arrows: "to", color: { color: "#ffcc00" } },
            { from: 5, to: 15, arrows: "to", color: { color: "#00ccff" } }
        ]);

        // 创建图谱数据
        const data = {
            nodes: nodes,
            edges: edges
        };

        // 配置选项
        const options = {
            layout: {
                improvedLayout: true,
                hierarchical: {
                    enabled: true,
                    direction: 'UD',
                    sortMethod: 'directed',
                    levelSeparation: 150,
                    nodeSpacing: 120
                }
            },
            physics: {
                enabled: true,
                hierarchicalRepulsion: {
                    centralGravity: 0.0,
                    springLength: 200,
                    springConstant: 0.01,
                    nodeDistance: 120,
                    damping: 0.09
                },
                stabilization: { 
                    iterations: 1000,
                    fit: true
                }
            },
            interaction: {
                dragNodes: true,
                dragView: true,
                zoomView: true,
                hover: true
            },
            nodes: {
                shape: 'dot',
                size: 25,
                font: {
                    size: 14,
                    face: 'Inter, sans-serif',
                    strokeWidth: 2,
                    strokeColor: 'rgba(0,0,0,0.8)'
                },
                borderWidth: 2,
                shadow: true
            },
            edges: {
                width: 3,
                color: {
                    color: 'rgba(0,255,255,0.6)',
                    highlight: '#00ffff',
                    hover: '#00ffff'
                },
                smooth: {
                    enabled: true,
                    type: 'continuous'
                },
                shadow: true
            },
            height: '100%',
            width: '100%'
        };

        // 渲染知识图谱
        try {
            const network = new vis.Network(container, data, options);

            // 添加节点点击事件
            network.on("click", function(params) {
                if (params.nodes.length > 0) {
                    const nodeId = params.nodes[0];
                    const node = nodes.get(nodeId);
                    
                    // 显示节点信息
                    const infoDiv = document.getElementById('node-info') || createNodeInfoDiv();
                    infoDiv.innerHTML = `
                        <h4>${node.label}</h4>
                        <p>这是磁共振成像中的重要概念</p>
                        <button onclick="this.parentElement.style.display='none'">关闭</button>
                    `;
                    infoDiv.style.display = 'block';
                }
            });

            // 添加悬停效果
            network.on("hoverNode", function(params) {
                container.style.cursor = 'pointer';
            });

            network.on("blurNode", function(params) {
                container.style.cursor = 'default';
            });

        } catch (error) {
            console.error('知识图谱初始化失败:', error);
            showFallbackGraph();
        }
    }

    function createNodeInfoDiv() {
        const infoDiv = document.createElement('div');
        infoDiv.id = 'node-info';
        infoDiv.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: #00ffff;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #00ffff;
            max-width: 300px;
            display: none;
            z-index: 1000;
        `;
        container.appendChild(infoDiv);
        return infoDiv;
    }

    function showFallbackGraph() {
        // 备用方案：SVG 知识图谱
        container.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%;">
                <svg width="100%" height="100%" viewBox="0 0 1000 600" style="background: rgba(0,0,0,0.1); border-radius: 8px;">
                    <!-- 连接线 -->
                    <line x1="500" y1="100" x2="350" y2="200" stroke="#00ffff" stroke-width="3"/>
                    <line x1="500" y1="100" x2="500" y2="200" stroke="#00ff00" stroke-width="3"/>
                    <line x1="500" y1="100" x2="650" y2="200" stroke="#ffff00" stroke-width="3"/>
                    
                    <!-- 中心节点 -->
                    <circle cx="500" cy="100" r="50" fill="#00ffff" stroke="#fff" stroke-width="3"/>
                    <text x="500" y="105" text-anchor="middle" fill="#000" font-weight="bold" font-size="16">MRI</text>
                    
                    <!-- 二级节点 -->
                    <circle cx="350" cy="200" r="35" fill="#ff00ff" stroke="#fff" stroke-width="2"/>
                    <text x="350" y="205" text-anchor="middle" fill="#fff" font-size="12">物理原理</text>
                    
                    <circle cx="500" cy="200" r="35" fill="#00ff00" stroke="#fff" stroke-width="2"/>
                    <text x="500" y="205" text-anchor="middle" fill="#000" font-size="12">成像序列</text>
                    
                    <circle cx="650" cy="200" r="35" fill="#ffff00" stroke="#fff" stroke-width="2"/>
                    <text x="650" y="205" text-anchor="middle" fill="#000" font-size="12">临床应用</text>
                    
                    <!-- 三级节点 -->
                    <circle cx="250" cy="300" r="25" fill="#9900ff" stroke="#fff" stroke-width="2"/>
                    <text x="250" y="305" text-anchor="middle" fill="#fff" font-size="10">核磁共振</text>
                    
                    <circle cx="350" cy="300" r="25" fill="#00ff99" stroke="#fff" stroke-width="2"/>
                    <text x="350" y="305" text-anchor="middle" fill="#000" font-size="10">弛豫时间</text>
                </svg>
                <div style="position: absolute; top: 10px; left: 10px; color: #00ffff; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px;">
                    <p>🔍 点击并拖拽查看完整图谱</p>
                    <p>🔄 使用鼠标滚轮缩放</p>
                </div>
            </div>
        `;
    }
});
