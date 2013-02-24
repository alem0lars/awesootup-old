require 'yaml'


class DbProvider::YamlProvider < DbProvider::AbstractDbProvider
  def initialize(yaml_pth)
    @db = symbolize(YAML.load_file(yaml_pth))
  end

  def get(*request)
    unless request.is_a?(Array)
      request = Array[request]
    end
    request.reverse!

    result = @db.dup
    until request.empty?
      result = result[request.pop]
    end

    result
  end

  private

  # Recursively convert keys to symbols
  def symbolize(obj)
    if obj.is_a? Hash
      obj.inject({ }) { |m, (k, v)| m[k.to_sym] = symbolize(v); m }
    elsif obj.is_a? Array
      obj.inject([]) { |m, v| m << symbolize(v); m }
    else
      obj
    end
  end

end
