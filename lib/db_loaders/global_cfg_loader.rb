$:.unshift File.expand_path(File.dirname(File.dirname(__FILE__)))

require 'db_provider'
require 'db_provider/yaml_provider'


$global_cfg = DbProvider::YamlProvider.new(
    DbProvider::DATABASES_PTH.join('global_cfg.yaml').to_s)
