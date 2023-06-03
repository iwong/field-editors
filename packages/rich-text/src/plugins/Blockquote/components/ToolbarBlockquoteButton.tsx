import * as React from 'react';

import { QuoteIcon } from '@contentful/f36-icons';
import { BLOCKS } from '@contentful/rich-text-types';

import { useContentfulEditor } from '../../../ContentfulEditorProvider';
import { isBlockSelected, focus } from '../../../helpers/editor';
import { ToolbarButton } from '../../shared/ToolbarButton';
import { toggleBlockquote } from '../toggleBlockquote';

export interface ToolbarBlockquoteButtonProps {
  isDisabled?: boolean;
}

export function ToolbarBlockquoteButton(props: ToolbarBlockquoteButtonProps) {
  const editor = useContentfulEditor();

  function handleOnClick() {
    if (!editor) return;

    toggleBlockquote(editor, editor.tracking.onToolbarAction);
    focus(editor);
  }

  if (!editor) return null;

  return (
    <ToolbarButton
      title="Blockquote"
      onClick={handleOnClick}
      testId="quote-toolbar-button"
      isDisabled={props.isDisabled}
      isActive={isBlockSelected(editor, BLOCKS.BLOCKQUOTE)}
    >
      <QuoteIcon />
    </ToolbarButton>
  );
}
