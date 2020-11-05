package XWord;

use Badger::Debug ':all';
use XWord::Config;
use XWord::Project;
use Contentity::Class
    version    => 1.00,
    debug      => 0,
    base       => 'Badger::Prototype',
    accessors  => 'root',
    autolook   => 'autoload_project autoload_config',
    filesystem => 'Dir',
    constant   => {
        PROJECT_MODULE => 'XWord::Project',
        CONFIG_MODULE  => 'XWord::Config',
    };

sub init {
    my ($self, $config) = @_;
    my $root = $config->{ root } || CONFIG_MODULE->root;
    $self->{ root   } = $root = Dir($root)->must_exist;
    $self->{ config } = $config;
    return $self;
}

sub project {
    my $self = shift->prototype;
    return  $self->{ project }
        ||= $self->PROJECT_MODULE->new(
            root => $self->root
        );
}


#-----------------------------------------------------------------------------
# The auto_can method is called when an unknown method is called.  It looks
# to see if the method can be delegated to either the database model or the
# hub.
#-----------------------------------------------------------------------------

sub autoload_project {
    my $self = shift->prototype;
    my ($name, @args) = @_;
    my $project = $self->project;

    return  $project->can($name)
        ?   $project->$name(@args)
        :   undef;
}

sub autoload_config {
    my ($self, $name, @args) = @_;
    my $config = $self->config;

    return  exists $config->{ $name }
        ?   $config->{ $name }
        :   undef;
}



1;

=head1 NAME

XWord - front-end interface to the Crossword Designer

=head1 SYNPOSIS

use XWord;

=head1 DESCRIPTION

The C<XWord> module provides an interface to the Crossword Designer app.

=head1 AUTHOR

Andy Wardley E<lt>abw@wardley.orgE<gt>.

=head1 COPYRIGHT

Copyright (C) 2020 Andy Wardley.  All Rights Reserved.

=cut
