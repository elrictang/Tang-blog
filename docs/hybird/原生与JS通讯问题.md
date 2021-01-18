---
title: 安卓原生与JS通讯方法总结
categories:
    - 移动端基础
tags: 
    - hybird
date: 2021-01-17
---

## 安卓调用js方法
### 使用loadUrl
优点：简单方便；缺点：获取回调的值比较麻烦
```java
mWebView.loadUrl("javascript:callJS()");
```

### 使用evaluateJavaScript
优点：效率更高；缺点：存在兼容性问题，安卓4.4版本以上才能使用
```java
mWebView.evaluateJavascript("javascript:callJs()", new ValueCallback<String>() {
    @Override
    public void onReceiveValue(String value) {
        // 此处未callJS()方法的返回值
    }
});
```
## js调用安卓原生方法
### 使用WebView的addJavascriptInterface注解进行对象映射（注入API）
1. 定义js待调用的安卓方法
```java
public class AndroidToJs extends Object {
    @javascriptInterface
    public void hello(String) {
        system.out.println("js调用了android的hello方法")
    }
}
```
2. 使用addJavascriptInterface()方法进行对象映射
```java
// mainActivity
WebSettings webSettings = mWebView.getSettings();
webSettings.setJavaScriptEnabled(true);
mWebView.addJavascriptInterface(new AndroidToJs(), "test");
```
3. js中使用映射对象调用安卓原生方法
```javascript
<script>
test.hello();
</script>
```
优点：使用简单，将js和安卓对象映射即可；缺点：安卓4.2以下存在安全漏洞

### 使用WebViewClient的shouldOverrideUrlLoading()拦截URL SCHEME
1. js中约定好协议
```javascript
<script>
function callAndroid(){
    /*约定的url协议为：js://webview?arg1=111&arg2=222*/
    document.location = "js://webview?arg1=111&arg2=222";
}
</script>
```
2. 在安卓WebView复写WebViewClient中的shouldOverrideUrlLoading()方法
```java
public class MainActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebSettings webSettings = mWebView.getSettings();
        // 设置与js交互权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许js弹框
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        // 加载js
        mWebView.loadUrl("file:///android_assets/test.html");
        // 复写shouldOverrideUrlLoading
        mWebView.setWebViewClinet(new WebViewClient() {
            @Override
            public shouldOverrideUrlLoading(WebView mWebView, String url) {
                // 根据协议的参数，判断是否是所约定的url
                // 一般通过协议格式（scheme）和协议名（authority）来判断
                Uri uri = Uri.parse(url);
                if(uri.getScheme().equals("js") && uri.getAuthority().equals("webview")) {
                    system.out.println("js调用了安卓方法");
                }
                return super.shouldOverrideUrlLoading(view, url);
            }
        })
    }
}
```
优点：不存在安全问题。缺点：使用复杂，需要协议约束；传值比较繁琐（需要使用loadUrl调用js方法传递结果）

### 使用WebChromeClient的onJsAlert(), onJsConfirm(),onJsPrompt()回调拦截js对话框
>注：采用的拦截是js的输入框即prompt()方法，因为prompt()对话框可以返回任意类型的数值，更全面。而alert()没有返回值栏目，confirm()只有确定和取消两种状态
1. js设置prompt方法调用
```javascript
<script>
function clickPrompt() {
    const res = prompt("js://demo?name='tony'&age=12");
    alert(`result is ${res}`);
}
</script>
```
2. 在Android通过WebChromeClient复写onJsPrompt()
```java
public class mainActivity {
    WebView mWebView;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebSettings webSettings = mWebView.getSettings();
        // 允许js交互
        webSettings.setJavaScriptEnabled(true);
        // 允许js弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        // 加载url
        mWebView.loadUrl("file:///android_assets/javascript.html");
        // 复写WebChromeClient中的onJSPrompt方法
        mWebView.setWebChromeClient(new WebChromeClinet() {
            @Override
            public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
                // 参数message:代表promt（）的内容（不是url）
                // 参数result:代表输入框的返回值
                Uri uri = Uri.parse(message);
                if(uri.getScheme().equals("js") && uri.getAuthority().equals("demo")) {
                    // 执JS需要的逻辑
                    System.out.println("js调用了Android方法");
                }
                return super.onJsPrompt(view, url, message, defaultValue, result);
            } 
        })
    }
}
```

### 三种方法对比
| 调用方式 | 优点 | 缺点 | 使用场景 |
| :---- | :---- | :---- | :---- |
| 通过addJavascriptInterface()进行对象映射 | 方便简洁 | Android4.2以下存在漏洞问题 | Android4.2以上相对简单的互调 |
| 通过WebViewClient的方法shouldOverrideUrlLoading()连接URL Scheme | 不存在漏洞问题 | 使用复杂，需要进行协议的约定；传值繁琐 | 不需要返回值的互调（IOS主要用这种方式） |
| 通过WebChromeClient的回调拦截对话框消息 | 不存在漏洞问题 | 使用复杂， 需要进行协议的约定 | 能满足绝大多数互调场景 |