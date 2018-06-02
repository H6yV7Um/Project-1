标题

This is an H1
=============

This is an H2
-------------

任何数量的 = 和 - 都可以有效果


# 这是 H1
## 这是 H2
### 这是 H3
#### 这是 H4
##### 这是 H5
###### 这是 H6

区块引用 Blockquotes

方法1：每行加>
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

方法2：也允许你偷懒只在整个段落的第一行最前面加上 >
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

区块引用可以嵌套
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

引用的区块内也可以使用其他的 Markdown 语法
> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");

列表

无序列表使用星号、加号或是减号作为列表标记：

*   Red
*   Green
*   Blue

等同于：

+   Red
+   Green
+   Blue

也等同于：

-   Red
-   Green
-   Blue

有序列表则使用数字接着一个英文句点：

1.  Bird
2.  McHale
3.  Parish


分隔线
你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

* * *

***

*****

- - -

---------------------------------------

代码
如果要标记一小段行内代码，你可以用反引号把它包起来（`），例如：

Use the `printf()` function.


Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

\\   反斜线
\`   反引号
\*   星号
\_   底线
\{}  花括号
\[]  方括号
\()  括弧
\#   井字号
\+   加号
\-   减号
\.   英文句点
\!   惊叹号
