---
id: running-testnet-windows
title: Running a Node on Windows
sidebar_label: Running a Node on Windows
---

<blockquote class="warning">
<strong>heads up</strong><br><br>

We have temporarily disabled connecting to TestNet.  This limitation may affect your ability to follow the instructions on this page.  Please [find us online](http://near.chat) if you have questions.

</blockquote>

#### This page outlines the steps involved on setting up a local node on Windows

1.  If Windows Subsystem for Linux is not enabled, open PowerShell as administrator and run:
    ```bash
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    ```
    Then restart your computer.
2. Go to your Microsoft Store and look for Ubuntu; this is the Ubuntu Terminal instance. Install and launch it.
3. Now you might be asked for username and password, do not use admin as username.
4. Your Ubuntu Instance does not have OpenSSL, which you will need to run the node. To download OpenSSL, please run the following commands in the Ubuntu Terminal:
    ```bash
    cd /tmp
    wget https://www.openssl.org/source/openssl-1.1.1.tar.gz
    tar xvf openssl-1.1.1.tar.gz
    ```
5. After it finished downloading OpenSSL, run the following commands to install:
    ```bash
    cd openssl-1.1.1
    sudo ./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)'
    sudo make
    sudo make install
    ```
    The files will be under the following directory: /usr/local/ssl.
6. Once this is finished, you have to ensure that Ubuntu is going to use the right version of OpenSSL. Now update the path for man pages and binaries. Run the following command:
    ```bash
    cd ../..
    sudo nano /etc/manpath.config
    ```
7. A text file will open, add the following line:
    ```bash
    MANPATH_MAP    		     /usr/local/ssl/man
    ```
8. Once this is done press ctrl + o . It will ask you to save the file, just press enter. Now press ctrl + x to exit.
9. To make sure that OpenSSL is installed run:
    ```bash
    openssl version -v
    ```
    This should show you the installed version. More info on this can be found here. (https://manpages.ubuntu.com/manpages/bionic/man1/version.1ssl.html)
10. Now you have to run the following commands:
    ```bash
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install pkg-config libssl-dev
    ```
    Great! All set to get the node up and running!
11. Create a new directory:
    ```bash
    mkdir nearprotocol (you can name this however you like)
    ```
12. Change into the directory:
    ```bash
    cd nearprotocol
    ```
13. Install a few more dependencies:
    ```bash
    sudo apt update
    sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler
    ```
14. Clone the github nearcore
    ```bash
    git clone https://github.com/nearprotocol/nearcore.git
    ```
15. This created a nearcore directory, change into that one:
    ```bash
    cd nearcore
    ```
Final: And now run the testnet:
    ```
    sudo ./scripts/start_testnet.py --nodocker
    ```


 You might be asked for a validator ID; if you do not want to validate, simply press enter. For validation, please refer to the [validation section](validator/staking.md).
