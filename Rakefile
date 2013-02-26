require 'nanoc3/tasks'

task :watch do
  sh 'bundle exec nanoc watch'
end

task :compile do
  sh 'bundle exec nanoc compile'
end

task :view do
  sh 'bundle exec nanoc view'
end

task :irb do
  sh 'bundle exec irb'
end

task :cleanup_all do
  Task['cleanup'].invoke()
  FileUtils.cd(File.join(Dir.pwd, 'output')) do
    FileUtils.rm_r('*')
  end
end
