---
title: 'GraphQL With Apollo'
description: '利用GraphQL和Apollo，打造全栈的Web应用。'
pubDate: '2022-04-21T15:10:10.000'
tags: ['GraphQL', 'React']
---

## Server Side

### `package.json`

`graphql`: graphQL安装

`apollo-server`: GraphQL服务器基础包

`apollo-datasource-rest`: api交互

```json
{
	"name": "catstronauts-server",
	"version": "1.0.0",
	"description": "back-end demo app for Apollo's lift-off III course",
	"main": "src/index.js",
	"scripts": {
		"start": "nodemon src/index"
	},
	"dependencies": {
		"graphql": "^15.5.1",
		"apollo-server": "^3.0.0",
		"apollo-datasource-rest": "^0.11.0"
	},
	"devDependencies": {
		"dotenv": "^8.2.0",
		"nodemon": "^2.0.4"
	},
	"author": "Raphael Terrier @R4ph-t",
	"license": "MIT",
	"private": true
}
```

### Project Structure

```toml
.
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── datasources
    │   └── track-api.js
    ├── index.js
    ├── resolvers.js
    └── schema.js

```

### `schema.js`

定义客户端可以获取的字段，及其类型。

类型除了常规的String、Int、ID类型，还可是其他字段。

除了表明返回一个值，还可以返回一个数组

#### 符号约定

`[]`：返回一个数组

`!`:不为null，但数组可以为empty

- `age: Int!`: `Int`类型的年龄不能为null
- `hobbies:[Hobby]!` :数组类型的`Hoby`不能为null，但是可以为空。

```js
// gql used for wrapping GraphQL strings
const { gql } = require('apollo-server')

const typeDefs = gql`
	"""
	多行注释
	"""
	type Query {
		"Query to get tracks array for the homepage grid"
		tracksForHome: [Track!]!
		"Fetch a specific track, provided a track's ID"
		track(id: ID!): Track
		module(id: ID!): Module
	}

	"A track is a group of Modules that teaches about a specific topic"
	type Track {
		id: ID!
		"The track's title"
		title: String!
		"The track's main Author"
		author: Author!
		"The track's illustration to display in track card or track page detail"
		thumbnail: String
		"The track's approximate length to complete, in minutes"
		length: Int
		"The number of modules this track contains"
		modulesCount: Int
		"The track's complete description, can be in Markdown format"
		description: String
		"The number of times a track has been viewed"
		numberOfViews: Int
		"The track's complete array of Modules"
		modules: [Module!]!
	}

	type Module {
		id: ID!
		"The module's title"
		title: String!
		"The Module's length in minutes"
		length: Int
		"The module's video url"
		videoUrl: String
		"The video's content"
		content: String
	}

	"Author of a complete Track or a Module"
	type Author {
		id: ID!
		"Author's first and last name"
		name: String!
		"Author's profile picture"
		photo: String
	}
`

module.exports = typeDefs
```

### `track.js`

利用`RESTDataSource` 实现和api的交互。

```js
const { RESTDataSource } = require('apollo-datasource-rest')

class TrackAPI extends RESTDataSource {
	constructor() {
		// 可以用RESTDataSource的方法
		super()
		// REST API address
		this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/'
	}

	getTracksForHome() {
		return this.get('tracks')
	}

	getTrack(trackId) {
		return this.get(`track/${trackId}`)
	}

	getModule(moduleId) {
		return this.get(`module/${moduleId}`)
	}

	getTrackModules(trackId) {
		return this.get(`track/${trackId}/modules`)
	}

	getAuthor(authorId) {
		return this.get(`author/${authorId}`)
	}
}

module.exports = TrackAPI
```

### `resolvers.js`

定义客户端可以发起的查询类型。

查询有4个参数：

`parent`: 根据类型定义，首次返回的数据。使用场景为根据返回的Object ID，再进行查询。

`args`: 客户端查询时发送的参数。使用场景为查找某个单一项目。

`context`: 传入的其他方法或参数。如数据api，认证。

`info`： 暂未使用。

```js
const resolvers = {
	Query: {
		// returns an array of Tracks that will be used to populate the homepage grid of our web client
		tracksForHome: (_, __, { dataSources }) => {
			return dataSources.trackAPI.getTracksForHome()
		},
		track: (_, { id }, { dataSources }) => {
			return dataSources.trackAPI.getTrack(id)
		},
		module: (_, { id }, { dataSources }) => {
			return dataSources.trackAPI.getModule(id)
		}
	},
	Track: {
		author: ({ authorId }, _, { dataSources }) => {
			return dataSources.trackAPI.getAuthor(authorId)
		},
		modules: ({ id }, _, { dataSources }) => {
			return dataSources.trackAPI.getTrackModules(id)
		}
	}
}

module.exports = resolvers
```

### `index.js`

```js
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const TrackAPI = require('./datasources/track-api')

const server = new ApolloServer({
	typeDefs,
	resolvers,
	// 对应resolvers中的定义
	dataSources: () => {
		return {
			trackAPI: new TrackAPI()
		}
	}
})

server.listen().then(() => {
	console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `)
})
```

## Client Side

### `package.json`

based on React

`graphql`: GraphQL 前端

`@apollo/client`: apollo 前端

```js
{
  "name": "catstronauts-client",
  "version": "1.0.0",
  "private": true,
  "description": "front-end demo app for Apollo's lift-off III course",
  "dependencies": {
    "@apollo/client": "^3.3.6",
    "@apollo/space-kit": "^9.3.1",
    "@emotion/cache": "^11.4.0",
    "@emotion/core": "^10.1.1",
    "@emotion/react": "^11.4.0",
    "@emotion/styled": "^11.3.0",
    "@reach/router": "^1.3.4",
    "framer-motion": "^4.1.17",
    "graphql": "^15.3.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-emotion": "^10.0.0",
    "react-markdown": "^6.0.2",
    "react-player": "^2.6.0",
    "react-scripts": "^4.0.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "apollo": "^2.30.2"
  },
  "main": "src/index.js",
  "author": "Raphael Terrier @R4ph-t",
  "license": "MIT"
}
```

### Project Structure

```toml
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── _redirects
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── space_kitty_pattern.png
└── src
    ├── assets
    │   ├── cat_logo.png
    │   ├── cat_logo@2x.png
    │   ├── space_cat_logo.png
    │   ├── space_cat_logo@2x.png
    │   └── space_kitty_pattern.svg
    ├── components
    │   ├── __tests__
    │   │   ├── module-detail.js
    │   │   ├── modules-navigation.js
    │   │   ├── query-result.js
    │   │   └── track-detail.js
    │   ├── content-section.js
    │   ├── footer.js
    │   ├── header.js
    │   ├── index.js
    │   ├── layout.js
    │   ├── md-content.js
    │   ├── module-detail.js
    │   ├── modules-navigation.js
    │   ├── query-result.js
    │   └── track-detail.js
    ├── containers
    │   ├── __tests__
    │   │   └── track-card.js
    │   └── track-card.js
    ├── index.js
    ├── pages
    │   ├── __tests__
    │   │   └── tracks.js
    │   ├── index.js
    │   ├── module.js
    │   ├── track.js
    │   └── tracks.js
    ├── styles.js
    └── utils
        ├── helpers.js
        ├── test-utils.js
        └── useWindowDimensions.js


```

### `index.js`

`ApolloClient`: create apollo client

`InMemoryCache`: enable cache utility

`ApolloProvider`: makes apollo client accessible for all React components

```js
import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './styles'
import Pages from './pages'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

// initialize apollo client
const client = new ApolloClient({
	uri: 'http://localhost:4000',
	// use cache to store queried data, speed up the next same query
	cache: new InMemoryCache()
})

ReactDOM.render(
	// so the apollo client can be used in all components
	<ApolloProvider client={client}>
		<GlobalStyles />
		<Pages />
	</ApolloProvider>,
	document.getElementById('root')
)
```

### Page.js(App.js)

`@reach/router`: router for reract, enable multiple pages' app. Components like `Track` or `Module` could access use the patameter.

```js
import React, { Fragment } from 'react'
import { Router } from '@reach/router'
/** importing our pages */
import Tracks from './tracks'
import Track from './track'
import Module from './module'

export default function Pages() {
	return (
		<Router primary={false} component={Fragment}>
			<Tracks path='/' />
			<Track path='/track/:trackId' />
			<Module path={'/track/:trackId/module/:moduleId'} />
		</Router>
	)
}
```

### `module.js`

notice that you can get data from different resolvers.

```js
import React from 'react'
// QueryResult ensure that the data handling process will not mess up the layout.
import { Layout, QueryResult } from '../components'
// gql: transform the Query to GraphQl-friendly
// useQuery: Hook that enable components executes the GraphQL queries, and get server feedback.
import { gql, useQuery } from '@apollo/client'
import ModuleDetail from '../components/module-detail'

export const GET_MODULE = gql`
	query getModule($moduleId: ID!, $trackId: ID!) {
		#    get the query variables
		module(id: $moduleId) {
			id
			title
			videoUrl
			content
		}

		track(id: $trackId) {
			id
			title
			modules {
				id
				title
				length
			}
		}
	}
`

const Module = ({ trackId, moduleId }) => {
	const { loading, error, data } = useQuery(GET_MODULE, {
		variables: {
			// use the data in router's url
			trackId: trackId,
			moduleId: moduleId
		}
	})

	return (
		<Layout fullWidth>
			<QueryResult loading={loading} error={error} data={data}>
				<ModuleDetail track={data?.track} module={data?.module} />
			</QueryResult>
		</Layout>
	)
}

export default Module
```

### `QueryResult.js`

```js
import React from 'react'
import styled from '@emotion/styled'
import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner'

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 * won't overwrite the style in outer box
 */
const QueryResult = ({ loading, error, data, children }) => {
	if (error) {
		return <p>ERROR: {error.message}</p>
	}
	if (loading) {
		return (
			<SpinnerContainer>
				<LoadingSpinner data-testid='spinner' size='large' theme='grayscale' />
			</SpinnerContainer>
		)
	}
	if (!data) {
		return <p>Nothing to show...</p>
	}
	if (data) {
		return children
	}
}

export default QueryResult

/** Query Result styled components */
const SpinnerContainer = styled.div({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100vh'
})
```

## Apollo Studio Explorer

default address: https://studio.apollographql.com/dev

1. write & run the query in ASE
2. check the results, modify schema and resolvers if necessary.
3. when everything is fine, just copy the query into the project and get what you want.
