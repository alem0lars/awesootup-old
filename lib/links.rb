module Links

  def self.internal_link(name, attributes = {})
    title = $global_cfg.get(:internal_links, name, :title)
    url = $global_cfg.get(:internal_links, name, :url)

    unless attributes.is_a?(Hash)
      attributes = {}
    end

    if attributes.has_key?(:prepend)
      title = "#{attributes.delete(:prepend)}#{title}"
    end
    if attributes.has_key?(:append)
      title = "#{title}#{attributes.delete(:append)}"
    end

    link_to(title, url, attributes)
  end

end

def internal_link(name, attributes = {})
  Links::internal_link(name, attributes)
end
