ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base
RUN apt-get update -qq  \
  && apt-get install -yq --no-install-recommends \
  build-essential \
  less \
  git \
  libpq-dev \
  curl
RUN apt-get update -qq && apt-get install -y default-libmysqlclient-dev
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
ENTRYPOINT ["./entrypoint.sh"]
COPY . /app
EXPOSE 3000
CMD ["./bin/rails", "server"]
