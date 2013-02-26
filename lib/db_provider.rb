$:.unshift File.expand_path(File.dirname(__FILE__))

require 'pathname'


# == Common stuff for db providers =============================================


# Basic module for all db providers
module DbProvider

  unless const_defined?(:DATABASES_PTH)
    DATABASES_PTH = Pathname.new(Dir.pwd).join('db')
  end

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
