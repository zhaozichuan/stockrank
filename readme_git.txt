
----------------------建立初始库-----------------------------
"echo "# playebean" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/zhaozichuan/playebean.git
git push -u origin master



git config --global user.name "zhaozichuan"
git config --global user.email "zhaozichuan@sina.com"


--------------------添加用户------------------------------
https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

ssh-keygen -t rsa -C "用户名"


ssh-add ~/.ssh/id_rsa

github 网站上添加 id_rsa.pub 公钥


ssh-agent -s

如果出现ssh connot connect 运行下面命令
ssh-agent bash

---------------修改远程引用----------------------------
git remote add zzc git@github.com:zhaozichuan/playebean
