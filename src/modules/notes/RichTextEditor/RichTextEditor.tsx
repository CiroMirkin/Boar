"use client"

import { useRef, useEffect } from "react"
import { Separator } from "@/ui/atoms/separator"
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Undo, Redo,
  Save
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRichTextEditor } from "./useRichTexEditor"
import { FormatButton } from "./FormatButton"

/**
 * Componente de editor de texto enriquecido (WYSIWYG).
 * Permite a los usuarios aplicar estilos de formato, listas, alineaciones, colores y más.
 * Incluye una barra de herramientas con botones de formato y un contador de caracteres.
 * 
 * También ofrece integración opcional con generación automática de texto mediante IA.
 */
interface RichTextEditorProps {
  /** Contenido HTML inicial o actual del editor */
  value?: string;
  /** Callback que se ejecuta al cambiar el contenido del editor */
  onChange?: (value: string) => void;
  /** Callback opcional que se ejecuta cuando el editor pierde el foco */
  onBlur?: () => void;
  /** Cantidad mínima de líneas visibles en el editor (afecta altura mínima) */
  rows?: number;
  /** Cantidad máxima de líneas visibles antes de que aparezca el scroll interno */
  maxRows?: number;
  /** Prompt opcional utilizado para la generación automática de contenido mediante IA */
  prompt?: string;
  /** Callback que se ejecutara al precionar el boton encargado de guardar el texto del editor. */
  saveTextCallback?: () => void;
}

export default function RichTextEditor({
  value = "",
  onChange,
  onBlur,
  rows = 3,
  maxRows = 10,
  prompt,
  saveTextCallback = () => {},
}: RichTextEditorProps) {

  /** Referencia al contenedor editable principal */
  const editorRef = useRef<HTMLDivElement | null>(null);
  /** Referencia al contenedor general del editor */
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Efecto que sincroniza el contenido del editor y ajusta su altura
   */
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Sincronizar contenido si es distinto
    if (value !== editor.innerHTML) {
      editor.innerHTML = value;
    }

    // Calcular y aplicar altura mínima y máxima
    const style = window.getComputedStyle(editor);
    const lineHeight = parseFloat(style.lineHeight) || 20;
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);

    editor.style.minHeight = `${rows * lineHeight + paddingTop + paddingBottom}px`;
    editor.style.maxHeight = `${maxRows * lineHeight + paddingTop + paddingBottom}px`;
  }, [value, rows, maxRows]);

  // Hooks personalizados para manejar el editor
  const {
    isFocused,
    loading,
    handleFormat,
    isCommandActive,
    updateActiveCommands,
    handleInput
  } = useRichTextEditor({
    value,
    onChange,
    prompt,
    editorRef
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full mx-auto border rounded-lg bg-background",
        "border-gray-300 dark:border-gray-700 transition-colors",
        isFocused && "border-foreground/60 ring-3 ring-foreground/10"
      )}
    >
      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/50">
        
        {/* Formato básico */}
        <div className="flex items-center gap-1">
          <FormatButton command="bold" icon={<Bold className="h-4 w-4" />} label="Negrita" isActive={isCommandActive("bold")} onClick={handleFormat} />
          <FormatButton command="italic" icon={<Italic className="h-4 w-4" />} label="Itálica" isActive={isCommandActive("italic")} onClick={handleFormat} />
          <FormatButton command="underline" icon={<Underline className="h-4 w-4" />} label="Subrayado" isActive={isCommandActive("underline")} onClick={handleFormat} />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Alineación */}
        <div className="flex items-center gap-1">
          <FormatButton command="justifyLeft" icon={<AlignLeft className="h-4 w-4" />} label="Alinear izquierda" isActive={false} onClick={handleFormat} />
          <FormatButton command="justifyCenter" icon={<AlignCenter className="h-4 w-4" />} label="Centrar" isActive={false} onClick={handleFormat} />
          <FormatButton command="justifyRight" icon={<AlignRight className="h-4 w-4" />} label="Alinear derecha" isActive={false} onClick={handleFormat} />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Listas */}
        <div className="flex items-center gap-1">
          <FormatButton command="insertUnorderedList" icon={<List className="h-4 w-4" />} label="Lista desordenada" isActive={false} onClick={handleFormat} />
          <FormatButton command="insertOrderedList" icon={<ListOrdered className="h-4 w-4" />} label="Lista ordenada" isActive={false} onClick={handleFormat} />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Historial */}
        <div className="flex items-center gap-1">
          <FormatButton command="undo" icon={<Undo className="h-4 w-4" />} label="Deshacer" isActive={false} onClick={handleFormat} />
          <FormatButton command="redo" icon={<Redo className="h-4 w-4" />} label="Rehacer" isActive={false} onClick={handleFormat} />
        </div>
        
        <Separator orientation="vertical" className="h-6" />
      
        <FormatButton command="saveCallback" icon={<Save className="h-4 w-4" />} label="Guardar texto" isActive={false} onClick={() => saveTextCallback()} />
      </div>

      {/* Editor de contenido editable */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={updateActiveCommands}
        onKeyUp={updateActiveCommands}
        onFocus={() => updateActiveCommands()}
        onBlur={() => onBlur?.()}
        className={cn(
          "min-h-40vh",
          "p-4 focus:outline-none prose prose-sm max-w-none custom-scrollbar text-base",
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6",
          "[&_li]:marker:text-foreground overflow-y-auto",
          loading && "opacity-50 pointer-events-none"
        )}
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}
