#========================================================================
# XWord::Config::Local
#
# DESCRIPTION
#   Local configuration module which stores the installation-specific
#   configuration data for the Crossword Designer project.
#
# AUTHOR
#   Andy Wardley <abw@wardley.org> November 2020
[% PROCESS warning -%]

package XWord::Config::Local;

use Badger::Filesystem 'Dir';
use Badger::Class
    version => 0.01,
    base    => 'Badger::Base',
    exports => {
        all => q{
            $ROOT
        }
    };

# The root directory of the project
our $ROOT = Dir('[% Project.dir %]');

1;


