package XWord::Template;

use utf8;
use Badger::Class
    version     => 0.01,
    debug       => 0,
    base        => 'Contentity::Template';

our $OPTIONS = {
    ANYCASE        => 1,
    OUTLINE_TAG    => '%%',
};

1;
