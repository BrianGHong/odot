#!/bin/bash
cd web
echo ====================
echo BUILDING WEB APP...
echo ====================
yarn build
echo ====================
echo DEPLOYING APP TO SURGE...
echo ====================
surge ./build odot.surge.sh
