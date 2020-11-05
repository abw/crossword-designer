//----------------------------------------------------------------------------
// WARNING!  Any changes you make to this file may be lost!
// This file is generated from templates/js/[% template.name %]
// when you run the 'bin/icons' script from the command line.
//----------------------------------------------------------------------------
import { library } from '@fortawesome/fontawesome-svg-core'

// import FontAwesome solid icons
import {
%%  for icon in icons.solid
    [% icon.faname %] as [% icon.id %],
%%  end
} from '@fortawesome/free-solid-svg-icons'

// import FontAwesome regular (outline) icons
import {
%%  for icon in icons.regular
    [% icon.faname %] as [% icon.id %],
%%  end
} from '@fortawesome/free-regular-svg-icons'

// add solid and regular icons to library
library.add(
%%  for icon in icons.solid
    [% icon.id %],
%%  end
%%  for icon in icons.regular
    [% icon.id %],
%%  end
);

// add icon aliases to library
library.add(
%%  for alias in icons.alias
%%    icon = alias.value
    { ...[% icon.id %], iconName:'[% alias.key %]', prefix:'fas' },
%%  end
);

// define custom icons
%%  for icon in icons.custom
%%  include custom.jsx
%%  end

// add custom icons to library
library.add(
%%  for icon in icons.custom
    [% icon.var %],
%%  end
);

// define lists of icon names, e.g. for generating style guide
export const icons = {
  regular: [
%%  for icon in icons.regular
    '[% icon.name %]',
%%  end
  ],
  solid: [
%%  for icon in icons.solid
    '[% icon.name %]',
%%  end
  ],
  custom: [
%%  for icon in icons.custom
    '[% icon.name %]',
%%  end
  ],
  alias: [
%%  for icon in icons.alias.keys.sort
    '[% icon %]',
%%  end
  ]
};


export default library