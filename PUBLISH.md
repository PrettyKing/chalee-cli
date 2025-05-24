# 📦 NPM 发布指南

## 发布到 NPM 的步骤

### 1. 准备工作

确保你已经：
- 注册了 [npmjs.com](https://www.npmjs.com/) 账号
- 验证了邮箱地址
- 在本地登录了 npm

### 2. 本地准备

```bash
# 克隆项目到本地
git clone https://github.com/PrettyKing/chalee-cli.git
cd chalee-cli

# 安装依赖（如果有的话）
npm install

# 测试 CLI 工具是否正常工作
node index.js
```

### 3. NPM 登录

```bash
# 登录 npm（如果还没登录）
npm login

# 验证登录状态
npm whoami
```

### 4. 检查包名可用性

```bash
# 检查包名是否已被占用
npm view chalee-cli

# 如果返回 404，说明包名可用
# 如果返回包信息，说明包名已被占用，需要更换
```

### 5. 发布前检查

```bash
# 检查将要发布的文件
npm pack --dry-run

# 这会显示将要包含在包中的所有文件
```

### 6. 发布到 NPM

```bash
# 发布到 npm
npm publish

# 如果是第一次发布，使用：
npm publish --access public
```

### 7. 验证发布

```bash
# 检查包是否成功发布
npm view chalee-cli

# 全局安装测试
npm install -g chalee-cli

# 测试命令
chalee-cli
# 或
chalee
```

## 🔧 如果包名被占用

如果 `chalee-cli` 已被占用，可以考虑以下替代名称：

- `@PrettyKing/chalee-cli`（作用域包）
- `chalee-webpack-cli`
- `chalee-scaffold`
- `chalee-generator`
- `vue-react-cli-generator`

### 使用作用域包

如果使用作用域包（推荐），修改 `package.json`：

```json
{
  \"name\": \"@prettyking/chalee-cli\",
  // ... 其他配置
}
```

然后发布：

```bash
npm publish --access public
```

安装使用：

```bash
npm install -g @prettyking/chalee-cli
```

## 📈 版本管理

### 更新版本

```bash
# 补丁版本（bug 修复）
npm version patch

# 小版本（新功能）
npm version minor

# 大版本（破坏性更改）
npm version major

# 发布新版本
npm publish
```

## 🚀 发布后的推广

1. **更新 README**
   - 添加 npm 安装说明
   - 添加 npm 徽章

2. **社交媒体分享**
   - 在技术社区分享
   - 写博客介绍工具

3. **收集反馈**
   - 关注 GitHub Issues
   - 收集用户建议

## ⚠️ 注意事项

1. **版本控制**：每次发布前确保版本号正确
2. **测试**：确保工具在不同环境下正常工作
3. **文档**：保持 README 和文档更新
4. **安全**：不要在包中包含敏感信息

## 📊 监控包状态

发布后可以通过以下方式监控：

- [npm 包页面](https://www.npmjs.com/package/chalee-cli)
- [npm-stat](https://npm-stat.com/) 查看下载统计
- GitHub Insights 查看仓库统计

---

🎉 **祝发布成功！**

如果遇到问题，可以查看 [npm 官方文档](https://docs.npmjs.com/cli/v8/commands/npm-publish) 或在 GitHub Issues 中提问。