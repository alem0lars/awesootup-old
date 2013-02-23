$:.unshift File.expand_path(File.dirname(__FILE__))


# == Bundled helpers ===========================================================

include Nanoc::Helpers::Rendering
include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::LinkTo
include Nanoc::Helpers::Tagging
include Nanoc::Helpers::Text


# == Custom helpers ============================================================

require 'helpers/guide_parts'
include Nanoc::Helpers::Guide::Parts

require 'helpers/guide_index'
include Nanoc::Helpers::Guide::Index
