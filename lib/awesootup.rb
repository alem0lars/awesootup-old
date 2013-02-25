$:.unshift File.expand_path(File.dirname(__FILE__))

require 'yaml'
require 'json'

require 'db_provider'


module Awesootup

  def self.get_avail_awesootups
    avail_awesootups = []

    Dir.glob(DbProvider::DATABASES_PTH
        .join('awesootups').join('*.yaml').to_s) do |awesootup|

      mod_cfg = DbProvider::YamlProvider.new(awesootup)

      modules = mod_cfg.get(:modules)
      modules = modules.is_a?(Array) ? modules : Array[modules.to_s]

      avail_awesootups << {
          :name => mod_cfg.get(:name).to_s,
          :desc => mod_cfg.get(:desc).to_s,
          :modules => modules,
          :author => mod_cfg.get(:author),
          :is_standalone => /^standalone.yaml$/.match(File.basename(awesootup))
      }

    end

    avail_awesootups # return
  end

end

def get_avail_awesootups
  Awesootup.get_avail_awesootups
end

def get_avail_awesootups_as_json
  get_avail_awesootups.to_json
end
