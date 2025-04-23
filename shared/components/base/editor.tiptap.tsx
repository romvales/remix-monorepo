
import { cn } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { BubbleMenu, EditorProvider, FloatingMenu, JSONContent, NodePos, useCurrentEditor } from '@tiptap/react'

import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { generateHTML as genHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'

type TiptapEditorProps = ComponentProps<{
  body?: unknown
  onUpdate: (content: JSONContent) => void
  onImagesRefUpdate?: (urls: string[]) => void
}>

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [ 1, 2, 3, 4, 5, 6 ],
    },
  }),

  Image.configure({
    HTMLAttributes: {
      'hermit-image': true,
    },
  }),
  
  Underline.configure({

  }),

  TextAlign.configure({
    
  }),

  TaskList.configure({
    
  }),

  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-center gap-1',
    },
    nested: true,
  }),

  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    shouldAutoLink: url => url.startsWith('https://'),
  }),
]

export function generateHTML(data: JSONContent | unknown) {
  return genHTML(data!, extensions)
}

export function TiptapEditorWithContext({ onUpdate, onImagesRefUpdate, body }: TiptapEditorProps) {

  return (
    <EditorProvider 
      autofocus
      editable
      content={body as JSONContent}
      extensions={[

        ...extensions,

        CharacterCount.configure({
          textCounter: text => [...new Intl.Segmenter().segment(text)].length,
          wordCounter: text => text.split(/\s+/).filter((word) => word !== '').length,
        }),

      ]}
      slotBefore={
        <>
          <TiptapToolbar />
        </>
      }>
      <TiptapEditor 
        onUpdate={onUpdate} 
        onImagesRefUpdate={onImagesRefUpdate} />
    </EditorProvider>
  )
}

export function TiptapEditor({ onUpdate, onImagesRefUpdate }: TiptapEditorProps) {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const getImages = (nodes: NodePos[] | null) => {
    return nodes?.map(node => node.attributes['src']) ?? []
  }

  useEffect(() => {

    editor.on('update', e => {
      const { editor } = e
      const images = getImages(editor.$nodes('image'))

      onUpdate(e.editor.getJSON())
      
      if (onImagesRefUpdate) onImagesRefUpdate(images)
    })

    editor.on('create', e => {
      const { editor } = e
      const images = getImages(editor.$nodes('image'))
      if (onImagesRefUpdate) onImagesRefUpdate(images)
    })

  }, [])

  return (
    <>
      <TiptapFloatingMenu />
      <TiptapBubbleMenu />
    </>
  )
}

function TiptapBubbleMenu() {
  return (
    <FloatingMenu editor={null}>
      <></>
    </FloatingMenu>
  )
}

function TiptapFloatingMenu() {
  
  return (
    <BubbleMenu editor={null}>
      <></>
    </BubbleMenu>
  )
}

import { Separator } from '@components/ui/separator'

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,

  ChevronLeftIcon,
  ChevronRightIcon,
  Code2Icon,

  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  LetterTextIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MinusIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function TiptapToolbar() {
  const { editor } = useCurrentEditor()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [isToolbarScrollable, setIsToolbarScrollable] = useState(false)
  const [lbtnVisible, setLbtnVisible] = useState(false)
  const [rbtnVisible, setRbtnVisible] = useState(true)

  if (!editor) {
    return null
  }

  const 
    onBold = () => editor.chain().focus().toggleBold().run(),
    isBoldActive = editor.isActive('bold'),
    isBoldDisabled = !editor.can().chain().focus().toggleBold().run(),
    
    onItalic = () => editor.chain().focus().toggleItalic().run(),
    isItalicActive = editor.isActive('italic'),
    isItalicDisabled = !editor.can().chain().focus().toggleBold().run(),

    onUnderline = () => editor.chain().focus().toggleUnderline().run(),
    isUnderlineActive = editor.isActive('underline'),
    isUnderlineDisabled = !editor.can().chain().focus().toggleUnderline().run(),

    onStrikethrough = () => editor.chain().focus().toggleStrike().run(),
    isStrikethroughActive = editor.isActive('strike'),
    isStrikethroughDisabled = !editor.can().chain().focus().toggleStrike().run(),

    onBlockquote = () => editor.chain().focus().toggleBlockquote().run(),
    isBlockquoteActive = editor.isActive('blockquote'),
    isBlockquoteDisabled = !editor.can().chain().focus().toggleBlockquote().run(),

    onTextAlignRight = () => editor.chain().focus().setTextAlign('right'),
    isTextAlignRightActive = editor.isActive({ textAlign: 'right' }),

    onTextAlignLeft = () => editor.chain().focus().setTextAlign('left'),
    isTextAlignLeftActive = editor.isActive({ textAlign: 'left' }),

    onTextAlignCenter = () => editor.chain().focus().setTextAlign('center'),
    isTextAlignCenterActive = editor.isActive({ textAlign: 'center' }),

    onTextAlignJustify = () => editor.chain().focus().setTextAlign('justify'),
    isTextAlignJustifyActive = editor.isActive({ textAlign: 'justify' }),

    onTaskList = () => editor.chain().focus().toggleTaskList().run(),
    isTaskListActive = () => editor.isActive('taskList'),

    onList = () => editor.chain().focus().toggleBulletList().run(),
    isListActive = editor.isActive('bulletList'),

    onOrderedList = () => editor.chain().focus().toggleOrderedList().run(),
    isOrderedListActive = editor.isActive('orderedList'),

    onParagraph = () => editor.chain().focus().setParagraph().run(),
    isParagraphActive = editor.isActive('paragraph'),

    onHorizontalRule = () => editor.chain().focus().setHorizontalRule().run(),
    isHorizontalRuleActive = editor.isActive('horizontalRule'),

    onCode = () => editor.chain().focus().setCodeBlock().run(),
    isCodeActive = editor.isActive('codeBlock'),

    onHeading = 
      (level: 1 | 2 | 3 | 4 | 5 | 6) => 
        editor.chain().focus().setHeading({ level }).run(),

    isHeadingActive =
      (level: 1 | 2 | 3 | 4 | 5 | 6) => 
        editor.isActive('heading', { level })

  const getToolbarProps = () => {
    const toolbar = toolbarRef.current!
    const { scrollWidth, clientWidth, offsetWidth, scrollLeft } = toolbar
    const currentScrollState = Math.round(scrollWidth - scrollLeft)

    return {
      toolbar,
      scrollWidth,
      clientWidth,
      offsetWidth,
      scrollLeft,
      currentScrollState,
    }
  }

  useEffect(() => {
    const toolbar = toolbarRef.current

    if (!toolbar) return
    
    const onScroll = () => {
      const { scrollWidth, clientWidth, offsetWidth, currentScrollState } = getToolbarProps()
      
      console.log(scrollWidth, clientWidth, offsetWidth, currentScrollState)

      if (currentScrollState == clientWidth) {
        setRbtnVisible(false)
      } else if (currentScrollState < scrollWidth) {
        setRbtnVisible(true)
      }

      if (currentScrollState == scrollWidth) {
        setLbtnVisible(false)
      } else if (currentScrollState > 0) {
        setLbtnVisible(true)
      }
    }

    const observer = new ResizeObserver(() => {
      const { scrollWidth, clientWidth } = toolbar

      if (scrollWidth > clientWidth) {
        setIsToolbarScrollable(true)
        return
      }

      setIsToolbarScrollable(false)
    })

    observer.observe(toolbar, { box: 'border-box' })

    toolbar.addEventListener('scroll', onScroll)

    return () => {
      observer.disconnect()
      toolbar.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onScrollLeft = () => {
    const { currentScrollState, scrollWidth } = getToolbarProps()

    if (currentScrollState < scrollWidth) {
      toolbarRef.current?.scrollBy({
        behavior: 'smooth',
        left: -128,
      })
    }
    
  }

  const onScrollRight = () => {
    const { currentScrollState, clientWidth } = getToolbarProps()

    if (currentScrollState > 0) {
      toolbarRef.current?.scrollBy({
        behavior: 'smooth',
        left: 128,
      })
    }
  }

  return (
    <div className='sticky top-0 z-20'>
      <div 
        ref={toolbarRef}
        role='toolbar'
        aria-label='Editor toolbar'
        className={
          cn(
            'hermit-toolbar overflow-x-scroll',
            'relative',
          )
        }>
        <div 
          className={
            cn(
              'flex w-max min-w-full',
              'shadow',
              'bg-white',
            )
          }>
          
          <Button 
            variant={'ghost'}
            size={'icon'} 
            onClick={onBold}
            disabled={isBoldDisabled}
            title='Bold'>
            <BoldIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={onItalic}
            disabled={isItalicDisabled}
            title='Italic'>
            <ItalicIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={onUnderline}
            disabled={isUnderlineDisabled}
            title='Underline'>
            <UnderlineIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={onStrikethrough}
            disabled={isStrikethroughDisabled}
            title='Strike'>
            <StrikethroughIcon />
          </Button>

          <Separator orientation='vertical' />

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Paragraph'
            onClick={onParagraph}>
            <LetterTextIcon />
          </Button>
        
          <Button
            variant={'ghost'}
            size={'icon'}
            title='Heading 1'
            onClick={() => onHeading(1)}>
            <Heading1Icon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Heading 2'
            onClick={() => onHeading(2)}>
            <Heading2Icon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Heading 3'
            onClick={() => onHeading(3)}>
            <Heading3Icon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Heading 4'
            onClick={() => onHeading(4)}>
            <Heading4Icon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Heading 5'
            onClick={() => onHeading(5)}>
            <Heading5Icon />
          </Button>
          
          <Button
            variant={'ghost'}
            size={'icon'}
            title='Heading 6'
            onClick={() => onHeading(6)}>
            <Heading6Icon />
          </Button>

          <Separator orientation='vertical' />

          <Button
            variant={'ghost'}
            size={'icon'}
            title='List'
            onClick={onList}>
            <ListIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Ordered List'
            onClick={onOrderedList}>
            <ListOrderedIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Todo list'
            onClick={onTaskList}>
            <ListTodoIcon />
          </Button>

          <Separator orientation='vertical' />

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Align left'
            onClick={onTextAlignLeft}>
            <AlignLeftIcon />
          </Button>
          
          <Button
            variant={'ghost'}
            size={'icon'}
            title='Align center'
            onClick={onTextAlignCenter}>
            <AlignCenterIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Align right'
            onClick={onTextAlignRight}>
            <AlignRightIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Justify'
            onClick={onTextAlignJustify}>
            <AlignJustifyIcon />
          </Button>

          <Separator orientation='vertical' />

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Blockquote'
            onClick={onBlockquote}
            disabled={isBlockquoteDisabled}>
            <TextQuoteIcon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Code block'
            onClick={onCode}>
            <Code2Icon />
          </Button>

          <Button
            variant={'ghost'}
            size={'icon'}
            title='Horizontal rule'
            onClick={onHorizontalRule}>
            <MinusIcon />
          </Button>

        </div>
      </div>
      {
        isToolbarScrollable && 
        lbtnVisible &&
        <Button 
          className='absolute top-0 left-0 bg-white'
          variant={'ghost'}
          size={'icon'}
          onClick={onScrollLeft}>
          <ChevronLeftIcon />
        </Button>
      }
      {
        isToolbarScrollable &&  
        rbtnVisible &&
        <Button 
          className='absolute top-0 right-0 bg-white'
          variant={'ghost'}
          size={'icon'}
          onClick={onScrollRight}>
          <ChevronRightIcon />
        </Button>
      }
    </div>
  )
}