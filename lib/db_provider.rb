$:.unshift File.expand_path(File.dirname(__FILE__))

require 'pathname'


# == Common stuff for db providers =============================================


# Basic module for all db providers
module DbProvider

  DATABASES_PTH = Pathname.new(Dir.pwd).join('db')

  # Basic class for all db providers
  class AbstractDbProvider
    def initialize
      @db = {}
    end

    def get(*request)
      raise 'Not implemented error'
    end

    def to_hash
      @db
    end
  end

end


# == DB providers requires =====================================================

require 'db_provider/yaml_provider'

# == Load databases
$global_cfg = DbProvider::YamlProvider.new(
    DbProvider::DATABASES_PTH.join('global_cfg.yaml').to_s)
