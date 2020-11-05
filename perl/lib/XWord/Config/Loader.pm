package XWord::Config::Loader;

use Badger
    Filesystem  => 'Cwd',
    Rainbow     => [ANSI => 'yellow'];

use Badger::Class
    version => 0.01,
    base    => 'Badger::Base',
    exports => {
        all => q{
            $ROOT
        }
    };


#-----------------------------------------------------------------------------
# Define sensible defaults - usually be over-ridden by XWord::Config::Local
#-----------------------------------------------------------------------------

our $ROOT = Cwd;


#-----------------------------------------------------------------------------
# See if we can load a XWord::Config::Local module which may override the above
#-----------------------------------------------------------------------------

eval "use XWord::Config::Local";

if ($@ && $@ =~ /^Can't locate/) {
    warn yellow("NOTE: XWord::Config::Local not found.  Assuming defaults."), "\n";
}
elsif ($@) {
    die $@;
}

1;
