#!/bin/bash
# while: exibir uma série de números
contador=1
while [[ $contador -le 5 ]]; do
echo $contador
contador=$((contador + 1))
done