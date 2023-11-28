ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as build
ENV APP_ROOT /app
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN set -eux && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  build-essential \
  default-mysql-client \
  default-libmysqlclient-dev \
  && \
  gem install bundler:2.3.7 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir ${APP_ROOT}
COPY ./backend/Gemfile ./backend/Gemfile.lock ${APP_ROOT}/

WORKDIR ${APP_ROOT}
RUN bundle install --jobs=4

ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim
ENV APP_ROOT /app
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN set -eux && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  default-libmysqlclient-dev  \
  build-essential \
  less \
  vim \
  locales \
  git \
  libpq-dev \
  curl \
  && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

WORKDIR ${APP_ROOT}
COPY --from=build /usr/local/bundle /usr/local/bundle

COPY ./backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD ["mysqld"]
