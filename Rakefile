require 'rake'
require 'fileutils'
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
  Rake::Task['clean'].invoke()
  FileUtils.cd(File.join(Dir.pwd, 'output')) do
    sh "rm -R *"
  end
end

task :fresh_compile => [:cleanup_all] do
  Rake::Task['compile'].invoke()
end
