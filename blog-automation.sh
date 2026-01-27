#!/bin/bash
# Script de gestión para automatización de blog posts
# Uso: ./blog-automation.sh [comando]

PLIST_PATH="$HOME/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist"
LOG_PATH="$HOME/internet/logs/blog-generator.log"
ERROR_LOG_PATH="$HOME/internet/logs/blog-generator.error.log"
SERVICE_NAME="co.cristiangarcia.blog-generator"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_help() {
    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   GESTIÓN DE AUTOMATIZACIÓN DE BLOG POSTS                ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Uso: ./blog-automation.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo ""
    echo -e "  ${GREEN}start${NC}      Iniciar el servicio de automatización"
    echo -e "  ${RED}stop${NC}       Detener el servicio"
    echo -e "  ${YELLOW}restart${NC}    Reiniciar el servicio (útil tras cambios)"
    echo -e "  ${BLUE}status${NC}     Ver estado del servicio"
    echo -e "  ${BLUE}logs${NC}       Ver logs en tiempo real"
    echo -e "  ${BLUE}errors${NC}     Ver logs de error en tiempo real"
    echo -e "  ${BLUE}run${NC}        Ejecutar el script manualmente ahora"
    echo -e "  ${BLUE}test${NC}       Probar una ejecución sin esperar al horario"
    echo ""
}

start_service() {
    echo -e "${GREEN}▶${NC} Iniciando servicio de automatización..."
    if launchctl load "$PLIST_PATH" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Servicio iniciado correctamente"
        echo -e "${BLUE}ℹ${NC} Se ejecutará automáticamente:"
        echo "  - Lunes a las 9:30 AM"
        echo "  - Miércoles a las 9:30 AM"
        echo "  - Viernes a las 9:30 AM"
        echo "  - Sábado a las 9:30 AM"
    else
        echo -e "${YELLOW}⚠${NC} El servicio ya estaba iniciado o hubo un error"
    fi
}

stop_service() {
    echo -e "${RED}■${NC} Deteniendo servicio de automatización..."
    if launchctl unload "$PLIST_PATH" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Servicio detenido correctamente"
    else
        echo -e "${YELLOW}⚠${NC} El servicio ya estaba detenido o hubo un error"
    fi
}

restart_service() {
    echo -e "${YELLOW}↻${NC} Reiniciando servicio..."
    stop_service
    sleep 1
    start_service
}

show_status() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}   ESTADO DEL SERVICIO${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    
    if launchctl list | grep -q "$SERVICE_NAME"; then
        echo -e "Estado: ${GREEN}ACTIVO ✓${NC}"
        echo ""
        launchctl list | grep "$SERVICE_NAME"
    else
        echo -e "Estado: ${RED}INACTIVO ✗${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}Archivo de configuración:${NC}"
    if [ -f "$PLIST_PATH" ]; then
        echo -e "  ${GREEN}✓${NC} $PLIST_PATH"
    else
        echo -e "  ${RED}✗${NC} No encontrado: $PLIST_PATH"
    fi
    
    echo ""
    echo -e "${BLUE}Logs:${NC}"
    if [ -f "$LOG_PATH" ]; then
        echo -e "  ${GREEN}✓${NC} $LOG_PATH"
        echo -e "     Tamaño: $(du -h "$LOG_PATH" | cut -f1)"
        echo -e "     Última modificación: $(stat -f "%Sm" "$LOG_PATH")"
    else
        echo -e "  ${YELLOW}⚠${NC} Sin logs aún: $LOG_PATH"
    fi
    
    if [ -f "$ERROR_LOG_PATH" ]; then
        ERROR_SIZE=$(stat -f%z "$ERROR_LOG_PATH")
        if [ $ERROR_SIZE -gt 0 ]; then
            echo -e "  ${RED}✗${NC} Errores detectados: $ERROR_LOG_PATH"
            echo -e "     Tamaño: $(du -h "$ERROR_LOG_PATH" | cut -f1)"
        fi
    fi
    echo ""
}

show_logs() {
    if [ ! -f "$LOG_PATH" ]; then
        echo -e "${YELLOW}⚠${NC} No hay logs disponibles aún"
        echo "El log se creará cuando se ejecute el script por primera vez"
        return
    fi
    
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}   LOGS EN TIEMPO REAL${NC}"
    echo -e "${BLUE}   (Ctrl+C para salir)${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    tail -f "$LOG_PATH"
}

show_errors() {
    if [ ! -f "$ERROR_LOG_PATH" ]; then
        echo -e "${GREEN}✓${NC} No hay errores registrados"
        return
    fi
    
    ERROR_SIZE=$(stat -f%z "$ERROR_LOG_PATH")
    if [ $ERROR_SIZE -eq 0 ]; then
        echo -e "${GREEN}✓${NC} No hay errores registrados"
        return
    fi
    
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}   ERRORES EN TIEMPO REAL${NC}"
    echo -e "${RED}   (Ctrl+C para salir)${NC}"
    echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    tail -f "$ERROR_LOG_PATH"
}

run_manual() {
    echo -e "${BLUE}▶${NC} Ejecutando script manualmente..."
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    cd "$HOME/internet"
    node scripts/generate-blog-post-custom.mjs
}

test_run() {
    echo -e "${YELLOW}⚡${NC} Ejecutando test (forzando ejecución sin esperar horario)..."
    echo ""
    launchctl start "$SERVICE_NAME"
    echo ""
    echo -e "${BLUE}ℹ${NC} La ejecución se ha iniciado en segundo plano"
    echo -e "${BLUE}ℹ${NC} Usa './blog-automation.sh logs' para ver el progreso"
}

# Comando principal
case "$1" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        restart_service
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    errors)
        show_errors
        ;;
    run)
        run_manual
        ;;
    test)
        test_run
        ;;
    *)
        print_help
        ;;
esac
