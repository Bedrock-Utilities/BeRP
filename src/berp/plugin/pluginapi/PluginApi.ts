import { Logger } from '../../../console'
import {
  examplePluginConfig,
  LoggerColors,
} from 'src/types/berp'
import { BeRP } from '../../'
import { ConnectionHandler } from 'src/berp/network'
import { CommandManager } from './command/CommandManager'
import { EventManager } from './events/EventManager'

export class PluginApi {
  private _berp: BeRP
  private _logger: Logger
  private _config: examplePluginConfig
  private _connection: ConnectionHandler
  private _commandManager: CommandManager
  private _eventManager: EventManager
  public path: string
  public color: LoggerColors = 'red'
  constructor (berp: BeRP, config: examplePluginConfig, path: string, connection: ConnectionHandler) {
    this._berp = berp
    this._config = config
    this._connection = connection
    this._commandManager = new CommandManager(this._connection)
    this._eventManager = new EventManager(this._berp, this._connection, this)
    this.path = path
    this._logger = new Logger(`${config.displayName} ${connection.realm.id}`, this.color)
    this._berp.getPluginManager().on('kill', () => {
      this._commandManager.kill()
    })
  }
  public getLogger(): Logger { return this._logger }
  public getConnection(): ConnectionHandler { return this._connection }
  public getCommandManager(): CommandManager { return this._commandManager }
  public getEventManager(): EventManager { return this._eventManager }
}
