#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Por favor, selecione:
1. Exibir informações do sistema
2. Exibir espaço em disco
3. Exibir a utilização do espaço doméstico
0. Quit
"
read -p "Escolha um valor [0-3] > "

case $REPLY in
    0)  echo "Programa finalizado."
        exit
        ;;
    1)  echo "Nome do computador: $HOSTNAME"
        uptime
        ;;
    2)  df -h
        ;;
    3)  if [[ $(id -u) -eq 0 ]]; then
                echo "Espaço em disco utilizado por todos os usuários"
                du -sh /home/*
        else
                echo " Espaço em disco utilizado pelo usuário ($USER)"
                du -sh $HOME
        fi
        ;;
    *)
        echo "Valor inválido." >&2
        exit 1
        ;;
Esac