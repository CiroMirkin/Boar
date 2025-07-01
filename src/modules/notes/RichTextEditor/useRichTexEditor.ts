import { useState, useCallback } from "react";
// import { useOpenAI } from "@/hooks/useOpenAI";

/**
 * Hook personalizado para manejar la lógica de un editor de texto enriquecido (WYSIWYG).
 * 
 * Proporciona funciones para:
 * - Aplicar formatos (negrita, itálica, subrayado, etc.).
 * - Detectar comandos activos en la selección actual.
 * - Manejar el foco del editor.
 * - Generar contenido automático mediante IA (simulado en este ejemplo).
 * 
 * @param value Contenido HTML actual del editor.
 * @param onChange Callback que se ejecuta al cambiar el contenido.
 * @param prompt Prompt opcional para generación automática de contenido con IA.
 * @param editorRef Referencia al contenedor editable del editor.
 * 
 * @returns Un objeto con funciones y estados para controlar el editor.
 */
export const useRichTextEditor = ({
  value,
  onChange,
  prompt,
  editorRef
}: {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  prompt?: string;
  editorRef: React.RefObject<HTMLDivElement | null>;
}) => {

  /** Conjunto de comandos activos en la selección actual (ej: 'bold', 'italic', etc.) */
  const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set());

  /** Indica si el editor tiene el foco actualmente */
  const [isFocused, setIsFocused] = useState(false);

  /** Estado de carga para indicar si se está generando contenido mediante IA */
  const [loading, setLoading] = useState(false);

  /**
   * ⚠️ Simulación de IA:
   * Este ejemplo simula la generación de contenido. En un caso real:
   * - Descomentar la línea de `useOpenAI`.
   * - Configurar correctamente el hook para consumir tu API de IA favorita.
   */
  // const { loading, generate } = useOpenAI();

  /**
   * Genera contenido automáticamente utilizando IA (simulado).
   * En producción, debería consumir un servicio de IA real.
   */
  const handleGenerateContent = useCallback(async () => {
    if (!prompt || !editorRef.current) return;

    try {
      setLoading(true);

      // Simulación de generación de contenido
      setTimeout(() => {
        const generatedContent = `<p><strong>Ejemplo de prueba:</strong> Este contenido fue generado de forma simulada. En producción, se puede generar dinámicamente utilizando la API de IA que prefieras.</p>`;

        if (editorRef.current) {
          editorRef.current.innerHTML = generatedContent;
          onChange?.(generatedContent);
          updateActiveCommands();
        }

        setLoading(false);
      }, 1500);

    } catch (err) {
      console.error("Error generando contenido:", err);
      setLoading(false);
    }
  }, [prompt, onChange]);

  /**
   * Actualiza el conjunto de comandos activos en función de la selección actual del editor.
   */
  const updateActiveCommands = useCallback(() => {
    const commands = ["bold", "italic", "underline"];
    const active = new Set<string>();

    commands.forEach((command) => {
      if (document.queryCommandState(command)) {
        active.add(command);
      }
    });

    setActiveCommands(active);
  }, []);

  /**
   * Aplica un formato al contenido seleccionado del editor.
   * 
   * @param command Comando de formato (ej: 'bold', 'italic', 'underline', etc.).
   * @param value Valor opcional para el comando (útil para colores, por ejemplo).
   */
  const handleFormat = useCallback((command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      onChange?.(editorRef.current.innerHTML);
      updateActiveCommands();
    }
  }, [onChange, updateActiveCommands]);

  /**
   * Maneja el evento de entrada de texto en el editor.
   * Sincroniza el valor y actualiza los comandos activos.
   */
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    const newContent = editorRef.current.innerHTML;

    if (newContent !== value) {
      onChange?.(newContent);
    }

    updateActiveCommands();
  }, [onChange, value, updateActiveCommands]);

  /**
   * Verifica si un comando específico está activo en la selección actual.
   * 
   * @param command Comando a verificar (ej: 'bold', 'italic').
   * @returns `true` si el comando está activo, `false` en caso contrario.
   */
  const isCommandActive = (command: string): boolean => {
    return activeCommands.has(command);
  };

  return {
    activeCommands,
    isFocused,
    loading,
    handleFormat,
    isCommandActive,
    handleGenerateContent,
    updateActiveCommands,
    handleInput,
    setIsFocused
  };
};
