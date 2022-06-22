#!/bin/bash
# read-menu: Programa de informações do sistema acionado por menu.
clear
echo "
Por favor, selecione:
1. Exibir informações do sistema
2. Exibir espaço em disco
3. Exibir a utilização do espaço doméstico
0. Quit
"
read -p "Escolha um valor [0-3] > "
if [[ $REPLY =~ ^[0-3]$ ]]; then
        if [[ $REPLY == 0 ]]; then
        echo "Programa finalizado."
        exit
fi
if [[ $REPLY == 1 ]]; then
        echo "Nome do computador: $HOSTNAME"
        uptime
        exit
fi
if [[ $REPLY == 2 ]]; then
        df -h
        exit
fi
if [[ $REPLY == 3 ]]; then
        if [[ $(id -u) -eq 0 ]]; then
                echo "Espaço em disco utilizado por todos os usuários"
                du -sh /home/*
        else
        echo "Espaço em disco utilizado pelo usuário ($USER)"
        du -sh $HOME
        fi
        exit
fi
else
        echo "Valor inválido." >&2
exit 1
fi