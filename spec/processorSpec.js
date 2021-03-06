/**
 * MIT License
 *
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-env jasmine */

'use strict'

const errors = require('@rduk/errors')
const BaseProcessor = require('../lib/processor/base')
const DefaultProcessor = require('../lib/processor/default')
const DefaultTranslator = require('../lib/translator/default')
const test = require('./helpers/testHelper')

describe('Processor', function () {
  describe('Base', function () {
    describe('initialization without argument', function () {
      it('should throw an ArgumentError', function () {
        expect(function () {
          let processor = new BaseProcessor() // eslint-disable-line 
        }).toThrowError(errors.ArgumentError)
      })
    })

    describe('initialization with bad argument', function () {
      it('should throw an ArgumentError', function () {
        expect(function () {
          let processor = new BaseProcessor({}) // eslint-disable-line 
        }).toThrowError(errors.ArgumentError)
      })
    })

    describe('method run called', function () {
      it('should throw a NotImplementedError', function () {
        expect(function () {
          let processor = new BaseProcessor(new DefaultTranslator())
          processor.run()
        }).toThrowError(errors.NotImplementedError)
      })
    })
  })

  describe('Default', function () {
    describe('method run called', function () {
      let processor = new DefaultProcessor(new DefaultTranslator())

      describe('with bad argument', function () {
        it('should throw an ArgumentError', function () {
          expect(function () {
            processor.run()
          }).toThrowError(errors.ArgumentError)

          expect(function () {
            processor.run({})
          }).toThrowError(errors.ArgumentError)
        })
      })

      describe('correctly', function () {
        it('should success', function (done) {
          processor.run({content: 'test'})
            .then(function (result) {
              test(result, 'test', done)
            })
        })
      })
    })
  })
})
