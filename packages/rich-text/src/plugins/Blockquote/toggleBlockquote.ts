import { BLOCKS } from '@contentful/rich-text-types';
import isHotkey from 'is-hotkey';

import { isBlockSelected } from '../../helpers/editor';
import { withoutNormalizing, wrapNodes, unwrapNodes, isElement } from '../../internal';
import { KeyboardHandler, HotkeyPlugin, PlateEditor } from '../../internal/types';
import { TrackingPluginActions } from '../../plugins/Tracking';

export function toggleBlockquote(
  editor: PlateEditor,
  logAction?: TrackingPluginActions['onShortcutAction'] | TrackingPluginActions['onToolbarAction']
): void {
  if (!editor.selection) return;

  const isActive = isBlockSelected(editor, BLOCKS.BLOCKQUOTE);

  logAction?.(isActive ? 'remove' : 'insert', { nodeType: BLOCKS.BLOCKQUOTE });

  withoutNormalizing(editor, () => {
    if (!editor.selection) return;

    unwrapNodes(editor, {
      match: (node) => isElement(node) && node.type === BLOCKS.BLOCKQUOTE,
      split: true,
    });

    if (!isActive) {
      const quote = {
        type: BLOCKS.BLOCKQUOTE,
        data: {},
        children: [],
      };

      wrapNodes(editor, quote);
    }
  });
}

export const onKeyDownToggleBlockquote: KeyboardHandler<HotkeyPlugin> =
  (editor, plugin) => (event) => {
    const { hotkey } = plugin.options;

    if (hotkey && isHotkey(hotkey, event)) {
      event.preventDefault();
      toggleBlockquote(editor, editor.tracking.onShortcutAction);
    }
  };
