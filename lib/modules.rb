require 'yaml'
require 'json'

require 'db_provider'


module Modules
  def self.get_avail_modules
    modules = []

    Dir.glob(Pathname.new(Dir.pwd)
        .join('content').join('assets').join('markup').join('guide')
        .join('modules').join('*')) do |mod|

      mod_cfg = DbProvider::YamlProvider.new(
          DbProvider::DATABASES_PTH.join("#{File.basename(mod)}_cfg.yaml").to_s)

      pre_reqs = mod_cfg.get(:pre_requirements)
      pre_reqs = pre_reqs.is_a?(Array) ? pre_reqs : Array[pre_reqs.to_s]
      post_reqs = mod_cfg.get(:post_requirements)
      post_reqs = post_reqs.is_a?(Array) ? post_reqs : Array[post_reqs.to_s]

      modules << {
          :name => mod_cfg.get(:name).to_s,
          :desc => mod_cfg.get(:description).to_s,
          :requires => mod_cfg.get(:requires).to_s,
          :pre_reqs => pre_reqs,
          :post_reqs => post_reqs
      }

    end

    modules # return
  end

end

def get_avail_modules
  Modules::get_avail_modules
end

def get_avail_modules_as_json
  get_avail_modules.to_json
end
