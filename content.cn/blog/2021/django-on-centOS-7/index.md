---
title: 'CentOS 7配置Django开发环境'
tags: ['Django', 'Python']
pubDate: '2021-08-28T12:23:16.000'
description: '服务器部署Django的第一步🔧'
---

本文主要用于记录在CentOS 7中配置Django的开发环境，面向已能独立在本地部署Django服务的读者。

我使用的是阿里云轻量应用服务器，系统镜像选择为Cent OS 7.3。

## SSH远程连接

SSH远程连接的工具上，Windows 可以选用[putty](https://www.putty.org/)，mac可以使用系统自带的终端进行ssh连接。

```bash
ssh root@'服务器IP地址'
```

之后输入服务器密码，即可访问。

## 安装Python 3.8.2

虽然CentOS 7自带python 2.7.5，但根据[Django官方文档](https://docs.djangoproject.com/en/3.2/releases/3.0/)，Django 3.0版本仅支持Python 3.6+。

```bash
# 查看服务器初始状态下的Python版本
python -V
2.7.5
```

为了使用Django的最新特性，我们需要更高版本的Python，同时，为了保持CentOS正常运行，我们需要保留python 2.7.5。因此，我们需要在系统中安装两个版本的python，而不能简单地进行升级处理。

[SCL](https://www.softwarecollections.org/en/)使我们可以在Linux下同时安装不同版本的软件，且软件之间不会引起冲突，适用于RHEL/CentOS/Fedora，完美满足需求。

```bash
# 安装SCL
sudo yum install centos-release-scl
# 安装Python 3.8
yum install -y rh-python38 which
scl enable rh-python38 bash
# 验证Python版本
python -V
> Python 3.8.6
```

## 创建虚拟环境

首先创建项目的文件夹。

```bash
# 返回根目录
cd /
# 创建项目文件夹
mkdir code
cd code
mkdir dj_pro
cd dj_pro
```

因为不同的项目可能需要不同的运行环境，而这些环境可能是冲突的，因此，我们创造出不同的虚拟环境，让每个应用独立运行。

我们这里使用的是Python 3自带的[venv](https://docs.python.org/zh-cn/3/library/venv.html)模块。

```bash
# 创建虚拟环境。下行最后的venv，即为虚拟环境的名称。
python3 -m venv venv
# 激活虚拟环境
. venv/bin/activate
```

激活后，命令行前方会出现虚拟环境的名称，表明已进入虚拟环境：

![激活虚拟环境.png](https://i.loli.net/2021/08/28/zTAXb5PLot9kE8Z.png)

## 在虚拟环境中安装Django

在进入虚拟环境的状态下，

```bash
# 安装Django
pip3 install django
# 验证Django版本
python -m django --version
> 3.2.6
```

Django安装完成

## 解决SQLite3报错

在实际用Django创建项目时，会因为SQLite版本过低而报错，具体如下：

```bash
# 创建Django项目，最后的字段为创建的项目文件夹名称，可自定义
django-admin startproject dj
cd dj
python manage.py check
# 报错，报错信息最后两行如下
# File "/code/dj_pro/venv/lib64/python3.8/site-packages/django/db/backends/sqlite3/base.py", line 68, in check_sqlite_version
# raise ImproperlyConfigured(django.core.exceptions.ImproperlyConfigured: SQLite 3.9.0 or later is required (found 3.7.17).
```

报错信息最后一行显示系统中的SQLite版本（3.7.17）过低，需要3.9.0之上的版本。

这里的第一个想法是升级SQLite，但是在实践中，即使升级之后，在`runserver`环节也会再次因为版本过低报错，因此，这里选择安装`pysqlite3`和`pysqlite3-binary`，并替换系统自带的SQLite，以彻底解决问题。

```bash
pip3 install pysqlite3
pip3 install pysqlite3-binary
```

然后我们到报错信息倒数第二行（File开头的报错语句）的文件中，修改引用。

```bash
vim /code/dj_pro/venv/lib64/python3.8/site-packages/django/db/backends/sqlite3/base.py
```

这里按`i`进入插入模式，将

```python
from sqlite3 import dbapi2 as Database
```

修改为

```python
from pysqlite3 import dbapi2 as Database
```

![sqlite修改.png](https://i.loli.net/2021/08/28/IuCJ64XTP1Hkvjq.png)

之后按`Esc`退出插入模式，并输入` :wq`保存退出。（更详细的vim语法可以参考 [Vim Cheat Sheet](https://vim.rtorr.com/)）

退出后，在命令行再次输入命令，已经不会报错。

```python
python manage.py check
> System check identified no issues (0 silenced).
```

## runserver

```python
# 初始化数据库
python manage.py migrate
# 创建管理员用户
python manage.py createsuperuser
# 陆续完成以下字段的输入
# Username (leave blank to use 'root'):
# Email address:
#Password:
#Password (again):
# Superuser created successfully.
```

此时，如果运行以下指令开启服务器

```python
python manage.py runserver
```

系统不会报错，会得到以下输出

```bash
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
August 28, 2021 - 03:46:45
Django version 3.2.6, using settings 'dj.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

此时，Django运行于`http://127.0.0.1:8000/`外部仍然无法访问，需要我们修改`settings.py`文件中的`ALLOWED_HOSTS`，`ctrl + c`退出服务器后，输入

```bash
cd dj #或你的其他项目文件夹名称
vim settings.py
```

参考“解决SQLite3报错”章节中，修改`pysqlite3`引用时的vim语法，将

```python
ALLOWED_HOSTS=[]
```

修改为：

```python
ALLOWED_HOSTS=['localhost','服务器ip地址','服务器绑定域名（如有）','127.0.0.1']
```

之后

```bash
# 因为manage.py在上级目录，我们需要进入到上级目录中
cd ..
# 0:80为0.0.0.0:80的简写
python manage.py runserver 0:80
```

Django环境配置成功🎉

![success.png](https://i.loli.net/2021/08/28/7jKENz9pCIriHyV.png)
