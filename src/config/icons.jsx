//----------------------------------------------------------------------------
// WARNING!  Any changes you make to this file may be lost!
// This file is generated from templates/js/icons.jsx
// when you run the 'bin/icons' script from the command line.
//----------------------------------------------------------------------------
import { library } from '@fortawesome/fontawesome-svg-core'

// import FontAwesome solid icons
import {
    faAdjust as faAdjustSolid,
    faArrowUp as faArrowUpSolid,
    faArrowDown as faArrowDownSolid,
    faArrowLeft as faArrowLeftSolid,
    faArrowRight as faArrowRightSolid,
    faCheckSquare as faCheckSquareSolid,
    faDownload as faDownloadSolid,
    faFileExport as faFileExportSolid,
    faFileImport as faFileImportSolid,
    faFont as faFontSolid,
    faSave as faSaveSolid,
    faTimes as faTimesSolid,
    faTrash as faTrashSolid,
    faUpload as faUploadSolid,
} from '@fortawesome/free-solid-svg-icons'

// import FontAwesome regular (outline) icons
import {
    faCheckCircle as faCheckCircleRegular,
    faCircle as faCircleRegular,
    faDotCircle as faDotCircleRegular,
} from '@fortawesome/free-regular-svg-icons'

// add solid and regular icons to library
library.add(
    faAdjustSolid,
    faArrowUpSolid,
    faArrowDownSolid,
    faArrowLeftSolid,
    faArrowRightSolid,
    faCheckSquareSolid,
    faDownloadSolid,
    faFileExportSolid,
    faFileImportSolid,
    faFontSolid,
    faSaveSolid,
    faTimesSolid,
    faTrashSolid,
    faUploadSolid,
    faCheckCircleRegular,
    faCircleRegular,
    faDotCircleRegular,
);

// add icon aliases to library
library.add(
    { ...faCheckSquareSolid, iconName:'checked', prefix:'fas' },
    { ...faDotCircleRegular, iconName:'dotted', prefix:'fas' },
);

// define custom icons

// add custom icons to library
library.add(
);

// define lists of icon names, e.g. for generating style guide
export const icons = {
  regular: [
    'check-circle',
    'circle',
    'dot-circle',
  ],
  solid: [
    'adjust',
    'arrow-up',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'check-square',
    'download',
    'file-export',
    'file-import',
    'font',
    'save',
    'times',
    'trash',
    'upload',
  ],
  custom: [
  ],
  alias: [
    'checked',
    'dotted',
  ]
};


export default library