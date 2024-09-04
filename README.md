# "颐智"关爱部署操作手册

**所属团队：AI帕鲁.elf**

2024.9.7  中国高校计算机大赛-AIGC创新赛  天津线下答辩

团队成员：**罗文斌，丁笠峰，加木安，李少鹏，洪维政**

## 1.安装Docker环境

#### 检查系统内核版本：

```sh
uname -r
```

确保内核版本高于 3.10。

#### 更新 yum 包：

```sh
sudo yum update
```

#### 安装必要的系统工具：

```sh
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

#### 添加 Docker 软件源信息：

```sh
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

#### 更新 yum 缓存：

```sh
sudo yum makecache fast
```

#### 安装 Docker：

```sh
sudo yum -y install docker-ce
```

#### 启动 Docker 服务：

```sh
sudo systemctl start docker
```

#### 设置 Docker 开机自启动：

```sh
sudo systemctl enable docker
docker version
```

**配置加速器**

可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器（参考阿里云官方帮助文档 https://cr.console.aliyun.com/cn-beijing/instances/mirrors ）

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://e7n1ndig.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
docker info
docker run hello-world
```



## 2.下载源码

```
yum -y group install "Development Tools"
```

```
git clone https://github.com/Robin-Jason/AIGC-Contest-Final.git
```

### 

## 3.部署应用

```sh
cd AIGC-Contest-Final
```

```sh
chmod 777 deploy.sh
```

```sh
./deploy.sh
```



运行完以上所有命令，应用即部署完成，打开服务器对应的公网IP即可访问部署成功的应用
