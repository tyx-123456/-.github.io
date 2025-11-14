function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 简单的知识图谱数据（简化版）
const graphData = {
    nodes: [
        { id: 1, label: "磁共振成像", color: "#00ffff" },
        { id: 2, label: "物理原理", color: "#ff00ff" },
        { id: 3, label: "成像序列", color: "#00ff00" },
        { id: 4, label: "临床应用", color: "#ffff00" },
        { id: 5, label: "核磁共振", color: "#ff9900" },
        { id: 6, label: "弛豫时间", color: "#9900ff" },
        { id: 7, label: "T1加权", color: "#00ff99" },
        { id: 8, label: "T2加权", color: "#ff0099" },
        { id: 9, label: "神经系统", color: "#99ff00" },
        { id: 10, label: "心血管", color: "#0099ff" }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 6 },
        { from: 3, to: 7 },
        { from: 3, to: 8 },
        { from: 4, to: 9 },
        { from: 4, to: 10 }
    ]
};

// 初始化知识图谱
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('graph-container');
    if (container) {
        // 这里可以集成vis-network来渲染真正的知识图谱
        // 暂时用文字说明替代
        container.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🧠</div>
                <div style="text-align: center; color: #00ffff;">
                    <h3>磁共振成像知识图谱</h3>
                    <p>使用vis.js库构建的交互式知识图谱</p>
                    <p>展示概念间的关联关系</p>
                </div>
            </div>
        `;
    }
});

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

// 后续可以添加 vis-network 的知识图谱 JS 初始化
