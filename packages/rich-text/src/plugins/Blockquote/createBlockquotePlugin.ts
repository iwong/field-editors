import { BLOCKS, CONTAINERS } from '@contentful/rich-text-types';

import { transformLift, transformUnwrap } from '../../helpers/transformers';
import { PlatePlugin } from '../../internal/types';
import { Blockquote } from './components/Blockquote';
import { shouldResetQuoteOnBackspace } from './shouldResetBlockquote';
import { onKeyDownToggleBlockquote, toggleBlockquote } from './toggleBlockquote';
import { withBlockquote } from './withBlockquote';

export function createBlockquotePlugin(): PlatePlugin {
  return {
    key: BLOCKS.BLOCKQUOTE,
    type: BLOCKS.BLOCKQUOTE,
    isElement: true,
    component: Blockquote,
    options: {
      hotkey: 'mod+shift+2',
    },
    handlers: {
      onKeyDown: onKeyDownToggleBlockquote,
    },
    deserializeHtml: {
      rules: [
        {
          validNodeName: 'BLOCKQUOTE',
        },
      ],
    },
    resetNode: [
      {
        // toggle off blockquote on backspace when it's empty
        hotkey: 'backspace',
        types: [BLOCKS.BLOCKQUOTE],
        predicate: shouldResetQuoteOnBackspace,
        onReset: toggleBlockquote,
      },
    ],
    normalizer: [
      {
        validChildren: CONTAINERS[BLOCKS.BLOCKQUOTE],
        transform: {
          [BLOCKS.BLOCKQUOTE]: transformUnwrap,
          default: transformLift,
        },
      },
    ],
    withOverrides: withBlockquote,
  };
}
