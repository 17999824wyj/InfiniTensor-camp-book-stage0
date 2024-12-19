# Q & A

## 目录

- [Q \& A](#q--a)
  - [目录](#目录)
  - [1. Cpp 第 30 题](#1-cpp-第-30-题)
  - [往期 QA 导航](#往期-qa-导航)

## 1. Cpp 第 30 题

有同学提到，Cpp 的析构顺序与平台是相关的，具体情况如下：

在 windows 里(MSVC)：

<p align="center">
<image src="./resources/win-析构.png" style="display: inline-block;" width=60%>
</p>

在 kali 里(gcc)：

<p align="center">
<image src="./resources/kali-析构.png" style="display: inline-block;" width=60%>
</p>

可以看到，虽然代码一样，但析构顺序是不同的。此问题的解决方法是，请确保析构顺序是确定的，即以 CI 中的 gcc 顺序为标准。

## 往期 QA 导航

- [2024 夏秋季](./problems/2024s.md)
