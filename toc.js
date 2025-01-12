// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="foreword.html"><strong aria-hidden="true">1.</strong> 前言</a></li><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">2.</strong> 介绍</a></li><li class="chapter-item expanded "><a href="ch1-00.html"><strong aria-hidden="true">3.</strong> 第一章：环境配置</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch1-01.html"><strong aria-hidden="true">3.1.</strong> Git 环境</a></li><li class="chapter-item expanded "><a href="ch1-02.html"><strong aria-hidden="true">3.2.</strong> Windows 下的 Rust 环境</a></li><li class="chapter-item expanded "><a href="ch1-03.html"><strong aria-hidden="true">3.3.</strong> Linux 下的 Rust 环境</a></li></ol></li><li class="chapter-item expanded "><a href="ch2-00.html"><strong aria-hidden="true">4.</strong> 第二章：导学阶段基本信息</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch2-01.html"><strong aria-hidden="true">4.1.</strong> 训练营教学系统使用引导</a></li><li class="chapter-item expanded "><a href="ch2-02.html"><strong aria-hidden="true">4.2.</strong> 导学阶段视频课程链接与学习引导</a></li><li class="chapter-item expanded "><a href="ch2-03.html"><strong aria-hidden="true">4.3.</strong> 训练营教学安排</a></li><li class="chapter-item expanded "><a href="ch2-04.html"><strong aria-hidden="true">4.4.</strong> 教学系统常见问题与解决方案</a></li></ol></li><li class="chapter-item expanded "><a href="ch3-00.html"><strong aria-hidden="true">5.</strong> 第三章：基本 Git 使用与 Github 流水线（Action）入门</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch3-01.html"><strong aria-hidden="true">5.1.</strong> 常用 Git 指令</a></li><li class="chapter-item expanded "><a href="ch3-02.html"><strong aria-hidden="true">5.2.</strong> Github 使用入门</a></li><li class="chapter-item expanded "><a href="ch3-03.html"><strong aria-hidden="true">5.3.</strong> GitHub Actions 常见问题与解决方案</a></li></ol></li><li class="chapter-item expanded "><a href="ch4-00.html"><strong aria-hidden="true">6.</strong> 第四章：打卡 InfiniLM</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch4-01.html"><strong aria-hidden="true">6.1.</strong> 拉取仓库 &amp; 示例模型下载</a></li><li class="chapter-item expanded "><a href="ch4-02.html"><strong aria-hidden="true">6.2.</strong> 编译模型 &amp; 运行</a></li><li class="chapter-item expanded "><a href="ch4-03.html"><strong aria-hidden="true">6.3.</strong> 其它服务</a></li></ol></li><li class="chapter-item expanded "><a href="ch5-00.html"><strong aria-hidden="true">7.</strong> 第五章：评分系统的使用</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch5-01.html"><strong aria-hidden="true">7.1.</strong> 下载环境</a></li><li class="chapter-item expanded "><a href="ch5-02.html"><strong aria-hidden="true">7.2.</strong> 实际操作的示例</a></li><li class="chapter-item expanded "><a href="ch5-03.html"><strong aria-hidden="true">7.3.</strong> 打卡 Cpp 测试(2024 冬季)</a></li><li class="chapter-item expanded "><a href="ch5-04.html"><strong aria-hidden="true">7.4.</strong> 打卡 Rust 测试(2024 冬季)</a></li></ol></li><li class="chapter-item expanded "><a href="problem.html"><strong aria-hidden="true">8.</strong> Q &amp; A</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="problems/2024s.html"><strong aria-hidden="true">8.1.</strong> 2024 夏秋季 Q &amp; A</a></li><li class="chapter-item expanded "><a href="problems/2024w.html"><strong aria-hidden="true">8.2.</strong> 2024 冬季 Q &amp; A</a></li></ol></li><li class="chapter-item expanded "><a href="appendix-A.html"><strong aria-hidden="true">9.</strong> 附录 A：可供参考的资料</a></li><li class="chapter-item expanded "><a href="appendix-B.html"><strong aria-hidden="true">10.</strong> 附录 B：能够运行项目的设备合集</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
