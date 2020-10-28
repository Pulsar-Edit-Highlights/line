desc 'Run package specs'
task :spec do
  puts 'Running package specs...'
  sh 'apm test'
end

namespace :travis do
  task :spec do
    sh 'curl -s https://raw.githubusercontent.com/atom/ci/master/build-package.sh | sh'
  end
end

task default: [:spec]
task travis: ['travis:spec']
